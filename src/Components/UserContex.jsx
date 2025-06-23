import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [channel, setChannel] = useState(localStorage.getItem("channel") || "");

  const updateUser = ({ userID, avatar, token }) => {
    if (userID) {
      localStorage.setItem("userID", userID);
      setUserID(userID);
    }
    if (avatar) {
      localStorage.setItem("avatar", avatar);
      setAvatar(avatar);
    }
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }
  };

  const updateChannel = (channelID) => {
    localStorage.setItem("channel", channelID);
    setChannel(channelID);
  };

  const clearUser = () => {
    localStorage.clear();
    setUserID("");
    setAvatar("");
    setToken("");
    setChannel("");
  };

  return (
    <UserContext.Provider value={{
      userID,
      avatar,
      token,
      channel,
      updateUser,
      updateChannel,
      clearUser
    }}>
      {children}
    </UserContext.Provider>
  );
}