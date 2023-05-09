import Cookies from "js-cookie";
const role = JSON.parse(localStorage.getItem("dms_user_role"));
export const authUser = localStorage.getItem("dms_user_role")
  ? role.toLowerCase()
  : "";

export const authUserToken = Cookies.get("dms_user_token") ? "token" : "";

