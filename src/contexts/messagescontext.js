import { useState } from "react";
import { db } from "../config/config";
import React from "react";
export const MessagesContext = React.createContext();

export const MessagesProvider = ({ children }) => {
  const [Messages, setMessages] = useState([]);
  function getMessages() {
    let Store = [];
    db.collection("Feedaback")
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        res.forEach((message) => {
          Store.push({ ...message.data(), ID: message.id });
        });
        setMessages(Store);
      });
  }
  function markRead(id) {
    db.collection("Feedaback")
      .doc(id)
      .update({ status: "read" })
      .then(getMessages);
  }

  const value = { Messages, setMessages, getMessages, markRead };
  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
