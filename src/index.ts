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

// Fetch Simpsons characters
app.get("/api/simpsons/characters", async (c) => {
  try {
    const response = await fetch("https://api.sampleapis.com/simpsons/characters");

    if (!response.ok) {
      return c.json({ error: "Failed to fetch Simpsons characters" }, 500);
    }

    const characters = await response.json();
    return c.json(characters);
  } catch (error) {
    console.error("Error fetching Simpsons characters:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default app;