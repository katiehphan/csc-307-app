import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };
  
  const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

  const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  
  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.send();
  });
  
  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    const userIndex = users.users_list.findIndex((user) => user.id === id);
  
    if (userIndex === -1) {
      res.status(404).send({ message: "User not found" });
    } else {
      users.users_list.splice(userIndex, 1); // Remove user from list
      res.status(200).send({ message: `User with ID ${id} deleted` });
    }
  });

  app.get("/users/filter", (req, res) => {
    const { name, job } = req.query;
  
    if (!name || !job) {
      res.status(400).send({ message: "Please provide both name and job as query parameters" });
    } else {
      const filteredUsers = users.users_list.filter(
        (user) => user.name === name && user.job === job
      );
  
      if (filteredUsers.length === 0) {
        res.status(404).send({ message: "No users found matching the criteria" });
      } else {
        res.status(200).send({ users_list: filteredUsers });
      }
    }
  });

  app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
      let result = findUserByName(name);
      result = { users_list: result };
      res.send(result);
    } else {
      res.send(users);
    }
  });