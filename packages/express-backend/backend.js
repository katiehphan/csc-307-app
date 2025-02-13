import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from './services/user-service.js';

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db npm "users"
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());
app.use(cors());

const port = 8000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//app.get('/users', (req, res) => {
//    const { name, job } = req.query;
//
//    userService.getUsers(name, job)
//        .then(users => {
//            if (!users.length) return res.status(404).json({ message: 'No users found' });
//            res.json(users);
//        })
//        .catch(error => res.status(500).json({ error: error.message }));
//});

app.get('/users', (req, res) => {
    const { name, job } = req.query;
  
    if (name && job) {
      userService.findUserByNameAndJob(name, job)
        .then(users => {
          if (!users.length) {
            return res.status(404).json({ message: 'No users found matching both name and job.' });
          }
          res.json(users);
        })
        .catch(error => res.status(500).json({ error: error.message }));
    } else if (name) {
      userService.findUserByName(name)
        .then(users => {
          if (!users.length) {
            return res.status(404).json({ message: 'No users found matching the name.' });
          }
          res.json(users);
        })
        .catch(error => res.status(500).json({ error: error.message }));
    } else if (job) {
      userService.findUserByJob(job)
        .then(users => {
          if (!users.length) {
            return res.status(404).json({ message: 'No users found matching the job.' });
          }
          res.json(users);
        })
        .catch(error => res.status(500).json({ error: error.message }));
    } else {
      userService.getUsers()
        .then(users => res.json(users))
        .catch(error => res.status(500).json({ error: error.message }));
    }
  });
  

app.get('/users/:id', (req, res) => {
    userService.findUserById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        })
        .catch(error => res.status(500).json({ error: error.message }));
});

app.post("/users", (req, res) => {
    userService.addUser(req.body)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json({ error: error.message }));
});

app.delete("/users/:id", (req, res) => {
    userService.findUserById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });

            return userService.deleteUser(req.params.id);
        })
        .then(() => res.status(204).send())
        .catch(error => res.status(500).json({ error: error.message }));
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
  
    userService.deleteUserById(id)
      .then(deletedUser => {
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully deleted', user: deletedUser });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



// import express from "express";
// import cors from "cors";
// // import findUserByJob from "./services/user-service"
// // import findUserByName from "/services/user-service"
// // import findUserById from "/services/user-service"
// // import getUsers from "/services/user-service"
// // import addUser from "/services/user-service"
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// //const mongoo = require('mongoose');
// //const expre = require('express');
// //const userService = require('./services/user-service');
// import userService from './services/user-service.js';


// dotenv.config();

// const { MONGO_CONNECTION_STRING } = process.env;

// mongoose.set("debug", true);
// mongoose
//   .connect(MONGO_CONNECTION_STRING + "users_list") // connect to Db "users"
//   .catch((error) => console.log(error));

// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/your-database-name', { 
// //     useNewUrlParser: true, 
// //     useUnifiedTopology: true 
// // }).then(() => console.log("Connected to MongoDB"))
// // .catch(err => console.error("Could not connect to MongoDB", err));

// // added everything before this for ie4 (step4)

// const port = 8000;

// // Enable CORS to allow frontend to communicate with backend
// app.use(cors());

// // Middleware to parse incoming JSON requests
// app.use(express.json());

// // Hardcoded user data
// const users = {
//     users_list: [
//         { id: "xyz789", name: "Charlie", job: "Janitor" },
//         { id: "abc123", name: "Mac", job: "Bouncer" },
//         { id: "ppp222", name: "Mac", job: "Professor" },
//         { id: "yat999", name: "Dee", job: "Aspiring actress" },
//         { id: "zap555", name: "Dennis", job: "Bartender" }
//     ]
// };

// // Root Route
// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// // Get all users (optional filtering by name or job)
// // app.get("/users", (req, res) => {
// //     const { name, job } = req.query;
// //     let filteredUsers = users["users_list"];

// //     if (name) {
// //         filteredUsers = filteredUsers.filter(user => user.name.toLowerCase() === name.toLowerCase());
// //     }

// //     findUserByName(name)

// //     if (job) {
// //         filteredUsers = filteredUsers.filter(user => user.job.toLowerCase() === job.toLowerCase());
// //     }

// //     findUserByJob(job)

// //     res.json({ users_list: filteredUsers });
// // });

// app.get('/users', (req, res) => {
//     const { name, job } = req.query; // Get name & job from query parameters

//     userService.getUsers(name, job)
//         .then(users => {
//             if (!users.length) return res.status(404).json({ message: 'No users found' });
//             res.json(users);
//         })
//         .catch(error => res.status(500).json({ error: error.message }));
// });

// // app.get('/users', (req, res) => {
// //     const User = require('../models/user');

// //     // Find users by name
// //     async function findUsersByName(name) {
// //         return User.find({ name: name }); // Case-sensitive match
// //     }
    
// //     // Find users by job
// //     async function findUsersByJob(job) {
// //         return User.find({ job: job }); // Case-sensitive match
// //     }
    
// //     module.exports = { findUsersByName, findUsersByJob, ...otherExports };
// // });

// // Get user by ID

// // app.get("/users/:id", (req, res) => {
// //     const id = req.params.id;
// //     const user = findUserById(id);
// //     if (user) {
// //         res.json(user);
// //     } else {
// //         res.status(404).json({ error: "User not found" });
// //     }

// //     .then return to res.json
// //     .catch error
// //     findUserByUser(user)
// // });

// app.get('/users/:id', (req, res) => {
//     userService.getUserById(req.params.id)
//         .then(user => {
//             if (!user) return res.status(404).json({ message: 'User not found' });
//             res.json(user);
//         })
//         .catch(error => res.status(500).json({ error: error.message }));
// });

// // Helper function to find a user by ID
// const findUserById = (id) => {
//     return users["users_list"].find(user => user["id"] === id);
// };

// // Add a new user
// // app.post("/users", (req, res) => {
// //     const userToAdd = req.body;

// //     // Ensure ID is generated before adding user
// //     userToAdd.id = generateRandomId();

// //     users["users_list"].push(userToAdd);
// //     res.status(201).json(userToAdd); // Send back the created user
// // });

// app.post("/users", (req, res) => {
//     userService.addUser(req.body)
//         .then(user => res.status(201).json(user)) // Send back the created user
//         .catch(error => res.status(400).json({ error: error.message })); // Handle errors
// });




// // Helper function to generate a unique random ID
// const generateRandomId = () => {
//     return Math.random().toString(36).substr(2, 8); // Generates a short random string
// };

// // Delete a user by ID
// app.delete("/users/:id", (req, res) => {
//     const id = req.params.id;
//     const index = users["users_list"].findIndex(user => user["id"] === id);

//     if (index !== -1) {
//         users["users_list"].splice(index, 1); // Remove user
//         res.status(204).send(); // No content response
//     } else {
//         res.status(404).json({ error: "User not found" });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
