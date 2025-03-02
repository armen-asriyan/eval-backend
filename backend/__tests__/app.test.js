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
