import request from "supertest";
import app from "../app.js";

// Test the root route
describe("GET /", () => {
  it("should serve the index.html file", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toBe("text/html");
  });
});

// Test the API Documentation route
describe("GET /api-docs", () => {
  it("should redirect '/api-docs' to '/api-docs/' then serve the swagger API documentation", async () => {
    const response = await request(app).get("/api-docs");
    // Expect the response to be a redirect
    expect(response.status).toBe(301);

    // Get the redirect location
    const redirectLocation = response.headers.location;

    // Follow the redirect
    const finalResponse = await request(app).get(redirectLocation);

    // Check the final response
    expect(finalResponse.status).toBe(200);
    expect(finalResponse.type).toBe("text/html");
  });
});

// Test non existing route handling
describe("GET /non-existing-route", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/non-existing-route");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("code", "NOT_FOUND");
  });

  it("should included the requested URL in the error message", async () => {
    const response = await request(app).get("/non-existing-route");
    expect(response.body).toHaveProperty(
      "message",
      "Route '/non-existing-route' not found."
    );
  });
});

describe("CORS", () => {
  it("should have proper CORS headers", async () => {
    const response = await request(app)
      .options("/")
      .set("Origin", process.env.CLIENT_URL || "http://localhost:5173");

    // Expect the response to be 204 (No Content, default for OPTIONS requests)
    expect(response.status).toBe(204);

    expect(response.headers["access-control-allow-origin"]).toBe(
      process.env.CLIENT_URL || "http://localhost:5173"
    );

    expect(response.headers["access-control-allow-credentials"]).toBe("true");
    expect(response.headers["access-control-allow-methods"]).toBe(
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
  });
});

// Security headers (helmet)
describe("Security headers", () => {
  it("should have proper security headers", async () => {
    const response = await request(app).get("/");
    expect(response.headers).toHaveProperty("x-xss-protection");
    expect(response.headers).toHaveProperty("x-frame-options");
    expect(response.headers).toHaveProperty("x-content-type-options");
    expect(response.headers).toHaveProperty("x-dns-prefetch-control");
    expect(response.headers).toHaveProperty("strict-transport-security");
    expect(response.headers).toHaveProperty(
      "x-permitted-cross-domain-policies"
    );
  });
});
