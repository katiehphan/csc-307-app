import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // State to store users
  const [characters, setCharacters] = useState([]);

  // Fetch users from backend when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the backend
  function fetchUsers() {
    fetch("http://localhost:8000/users")
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched users:", data.users_list);  // Debugging
            if (data.users_list) {
                setCharacters(data.users_list);  // Update state
            }
        })
        .catch((error) => console.log("Error fetching users:", error));
}


  // Function to remove a character from backend
  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setCharacters((prev) => prev.filter((user) => user.id !== id));
        } else {
          console.log("Error deleting user");
        }
      })
      .catch((error) => console.log("Error deleting user:", error));
  }

  // Function to add a character to backend
  function updateList(person) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => {
        if (res.status === 201) return res.json();
        else throw new Error("Failed to add user");
      })
      .then((newUser) => {
        setCharacters((prev) => [...prev, newUser]); // Add new user to state
      })
      .catch((error) => console.log("Error adding user:", error));
  }

  return (
    <div className="container">
      <h1>Character Management App</h1>
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
