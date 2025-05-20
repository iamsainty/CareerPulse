"use client";

import { useContext, createContext } from "react";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const serverUrl = "http://localhost:3001";

  const updateProfile = async (
    name,
    location,
    yearsOfExperience,
    skills,
    jobType
  ) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${serverUrl}/user-profile/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          name,
          location,
          yearsOfExperience,
          skills,
          jobType,
        }),
      });

      const data = await response.json();
      console.log(data);
      return data.message;
    } catch (error) {
      console.error("Error updating profile:", error);
      return error.message;
    }
  };

  return (
    <UserProfileContext.Provider value={{ updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);
