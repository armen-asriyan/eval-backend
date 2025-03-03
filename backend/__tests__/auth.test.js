import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../src/models/User.js";
import { hashPassword, comparePassword } from "../src/services/hashPassword.js";
import axios from "axios";

// Helper function to create a test user
const createTestUser = async (overrides = {}) => {
  const defaultUser = {
    name: "John Doe",
    email: "test@example.com",
    password: "password123",
    role: "user",
  };
  const userData = { ...defaultUser, ...overrides };
  userData.password = await hashPassword(userData.password);
  return await User.create(userData);
};

describe("Auth routes", () => {
  let server;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    server = app.listen(0); // Use 0 to get a random available port
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    server.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    jest.resetModules();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user with valid data", async () => {
      const plainPassword = "password123";
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "John Doe",
          email: "user@example.com",
          password: plainPassword,
          role: "user",
        })
        .expect(201);

      expect(response.body).toMatchObject({
        message: "User created successfully",
        user: {
          name: "John Doe",
          email: "user@example.com",
          role: "user",
          skills: [],
        },
      });

      const user = await User.findOne({ email: "user@example.com" }).select(
        "+password"
      );
      expect(user).toBeTruthy();
      expect(await comparePassword(plainPassword, user.password)).toBe(true);
    });

    it("should fail registration with invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "John Doe",
          email: "invalid-email",
          password: "password123",
          role: "user",
        })
        .expect(400);

      expect(response.body).toHaveProperty("errors");
    });

    it("should fail registration with duplicate email", async () => {
      await createTestUser({ email: "duplicate@example.com" });

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Jane Doe",
          email: "duplicate@example.com",
          password: "password123",
          role: "user",
        })
        .expect(400);

      expect(response.body).toHaveProperty(
        "message",
        expect.stringContaining("User already exists")
      );
    });

    it("should register first admin and reject subsequent admins", async () => {
      // First admin
      await request(app)
        .post("/api/auth/register")
        .send({
          name: "Admin One",
          email: "admin1@example.com",
          password: "password123",
          role: "admin",
        })
        .expect(201);

      // Second admin attempt
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Admin Two",
          email: "admin2@example.com",
          password: "password123",
          role: "admin",
        })
        .expect(400);

      expect(response.body.message).toBe(
        "Only one admin is allowed during initial setup"
      );
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await createTestUser({ email: "login@example.com" });
      jest.spyOn(axios, "post").mockResolvedValue({ data: { success: true } }); // Mock reCAPTCHA success
    });

    it("should login a user with correct credentials and valid reCAPTCHA", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@example.com",
          password: "password123",
          captchaToken: "valid-captcha-token",
        })
        .expect(200);

      expect(response.body).toMatchObject({
        message: "User authenticated",
        user: {
          email: "login@example.com",
          role: "user",
        },
      });
      expect(response.body).toHaveProperty("accessToken");
    });

    it("should fail login with correct credentials but invalid reCAPTCHA", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@example.com",
          password: "password123",
          captchaToken: null,
        })
        .expect(400);

      expect(response.body).toHaveProperty(
        "message",
        expect.stringContaining("Captcha")
      );
    });

    it("should fail login with incorrect password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login@example.com",
          password: "wrongpassword",
          captchaToken: "valid-captcha-token",
        })
        .expect(401);

      expect(response.body).toHaveProperty(
        "message",
        expect.stringContaining("Invalid")
      );
    });

    it("should fail login with non-existent user", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
          captchaToken: "valid-captcha-token",
        })
        .expect(401);

      expect(response.body).toHaveProperty(
        "message",
        expect.stringContaining("Invalid")
      );
    });
  });

  // Add timeout handling test
  it("should handle request timeout appropriately", async () => {
    jest.setTimeout(10000);
    const response = await request(app)
      .post("/api/auth/register")
      .timeout(1000) // Simulate timeout
      .send({
        name: "Timeout Test",
        email: "timeout@example.com",
        password: "password123",
        role: "user",
      })
      .expect(201);
  });
});
