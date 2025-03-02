import request from "supertest";
import app from "../app";

// Test global app (separate from user and skill routes)
describe("User Routes"),
  () => {
    // Initialize the supertest object before each test
    beforeAll(() => {
      request = supertest(app);
    });

    // Test express
  };
