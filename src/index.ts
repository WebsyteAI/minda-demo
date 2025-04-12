import { Hono } from "hono";

const app = new Hono();

// In-memory store for user data
const userStore: Record<string, any> = {};

// Fetch user details by reference ID
app.get("/api/user/:refId", async (c) => {
  const refId = c.req.param("refId");

  // Fetch user data from the in-memory store
  const userData = userStore[refId];

  if (!userData) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json(userData);
});

// Add a new user (for testing purposes)
app.post("/api/user", async (c) => {
  const body = await c.req.json();

  const { refId, firstName, lastName, location, skillset, resume } = body;

  if (!refId || !firstName || !lastName || !location || !skillset || !resume) {
    return c.json({ error: "Missing required fields" }, 400);
  }

  // Save user data to the in-memory store
  userStore[refId] = { firstName, lastName, location, skillset, resume };

  return c.json({ message: "User added successfully", refId });
});

export default app;