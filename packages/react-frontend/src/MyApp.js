import React, { useState, useEffect } from "react";

function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  
useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  