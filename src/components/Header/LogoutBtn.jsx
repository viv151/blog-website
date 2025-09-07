import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHanlder = () => {
    authService.logout().then(() => {
      dispatch(logout()); // dispatching logout so that the value in the store stays updated.
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHanlder}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
