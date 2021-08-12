import { useState } from "react";
import { db } from "../config/config";
import React from "react";
export const UsersContext = React.createContext();

export const UsersProvider = ({ children }) => {
  const [Users, setUsers] = useState([]);
  function getUsers() {
    let Store = [];
    db.collection("Users")
      .get()
      .then((res) => {
        res.forEach((user) => {
          Store.push({ ...user.data(), ID: user.id });
        });
        setUsers(Store);
      });
  }

  const value = { Users, setUsers, getUsers };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
