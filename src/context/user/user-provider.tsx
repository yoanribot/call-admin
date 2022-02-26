import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Provider } from "./user-context";
import { User } from "types";
import {
  login as authLogin,
  getUser,
  updateAuthToken,
  logout as authLogout,
} from "services/authentication";
import axios from "axios";

type Props = { children: React.ReactNode };

const PlacesProvider = (props: Props) => {
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const _user = getUser();

    if (!!_user) {
      setUser(_user);
      setIsAuth(true);

      updateAuthToken(_user.access_token);
    }
  }, []);

  const login = async () => {
    try {
      const newUser = await authLogin("admin", "admin");

      setUser(newUser);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    authLogout();
    setUser(undefined);
    setIsAuth(false);
    navigate("/");
  };

  return (
    <Provider
      value={{
        user,
        isAuth,
        login,
        logout,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default PlacesProvider;
