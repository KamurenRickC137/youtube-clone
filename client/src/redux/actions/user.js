import axios from "axios";
import { BACKEND_URL } from "../../config";

const api = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URL,
});

const setAuth = (isAuth) => {
  return {
    type: "SET_AUTH",
    payload: { isAuth },
  };
};

const setUserInfo = (user) => {
  return {
    type: "SET_USER_INFO",
    payload: user,
  };
};

const logoutUser = (history) => {
  return async (dispatch) => {
    try {
      await api.get("/api/auth/google/logout");
      dispatch(setAuth(false));
      dispatch(
        setUserInfo({
          id: null,
          name: null,
          email: null,
          profileImg: null,
        })
      );
      history.push("/");
    } catch (err) {
      dispatch(setAuth(false));
      dispatch(
        setUserInfo({
          id: null,
          name: null,
          email: null,
          profileImg: null,
        })
      );
    }
  };
};

const auth = () => {
  return async (dispatch) => {
    try {
      const { data } = await api.get("/api/users");
      dispatch(setAuth(true));
      dispatch(
        setUserInfo({
          id: data.id,
          name: data.name,
          email: data.email,
          profileImg: data.profileImg,
        })
      );
    } catch (err) {
      dispatch(setAuth(false));
      dispatch(
        setUserInfo({
          id: null,
          name: null,
          email: null,
          profileImg: null,
        })
      );
    }
  };
};
export { auth, logoutUser, setUserInfo };
