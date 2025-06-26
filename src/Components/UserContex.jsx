import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userID, setUserID] = useState(localStorage.getItem("userID") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [channel, setChannel] = useState(localStorage.getItem("channel") || "");
  const [searched, setSearched] = useState("");

  //Globally sets the currently logged in or newly registered user information
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

  //Globally sets the channel information of the user who is currently logged in/if they own a channel
  const updateChannel = (channelID) => {
    localStorage.setItem("channel", channelID);
    setChannel(channelID);
  };

  //Gloobally clears the user and channel info when the user logs out
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
      searched,
      updateUser,
      updateChannel,
      clearUser,
      setSearched
    }}>
      {children}
    </UserContext.Provider>
  );
}