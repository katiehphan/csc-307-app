import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

// Enable CORS to allow frontend to communicate with backend
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Hardcoded user data
const users = {
    users_list: [
        { id: "xyz789", name: "Charlie", job: "Janitor" },
        { id: "abc123", name: "Mac", job: "Bouncer" },
        { id: "ppp222", name: "Mac", job: "Professor" },
        { id: "yat999", name: "Dee", job: "Aspiring actress" },
        { id: "zap555", name: "Dennis", job: "Bartender" }
    ]
};

// Root Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Get all users (optional filtering by name or job)
app.get("/users", (req, res) => {
    const { name, job } = req.query;
    let filteredUsers = users["users_list"];

    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase() === name.toLowerCase());
    }
    if (job) {
        filteredUsers = filteredUsers.filter(user => user.job.toLowerCase() === job.toLowerCase());
    }

    res.json({ users_list: filteredUsers });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = findUserById(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Helper function to find a user by ID
const findUserById = (id) => {
    return users["users_list"].find(user => user["id"] === id);
};

// Add a new user
app.post("/users", (req, res) => {
    const userToAdd = req.body;

    // Ensure ID is generated before adding user
    userToAdd.id = generateRandomId();

    users["users_list"].push(userToAdd);
    res.status(201).json(userToAdd); // Send back the created user
});

// Helper function to generate a unique random ID
const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 8); // Generates a short random string
};

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users["users_list"].findIndex(user => user["id"] === id);

    if (index !== -1) {
        users["users_list"].splice(index, 1); // Remove user
        res.status(204).send(); // No content response
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
