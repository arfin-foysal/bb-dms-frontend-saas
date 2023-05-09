import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: localStorage.getItem("dms_user")
    ? JSON.parse(localStorage.getItem("dms_user"))
    : null,
  permissions: localStorage.getItem("dms_permissions")
    ? JSON.parse(localStorage.getItem("dms_permissions"))
    : null,
  token: Cookies.get("dms_user_token")
    ? Cookies.get("dms_user_token")
    : null,
  role: localStorage.getItem("dms_user_role")
    ? JSON.parse(localStorage.getItem("dms_user_role"))
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authToken: (state, action) => {
      Cookies.set("dms_user_token", action.payload);
    },

    authUser: (state, action) => {
      localStorage.setItem("dms_user", JSON.stringify(action.payload));
    },

    userRole: (state, action) => {
      localStorage.setItem("dms_user_role", JSON.stringify(action.payload));
    },

    userPermission: (state, action) => {
      localStorage.setItem("dms_permissions", JSON.stringify(action.payload));
    },

    logout: (state) => {
      Cookies.remove("dms_user_token");
      localStorage.removeItem("dms_user");
      localStorage.removeItem("dms_permissions");
      localStorage.removeItem("dms_user_role");
      
      state.user = null;
      state.permissions = null;
      state.token = null;
      state.role = null;
    },
  },
});

export const { authUser, userPermission, userRole, authToken,logout} =
  authSlice.actions;
export default authSlice.reducer;
