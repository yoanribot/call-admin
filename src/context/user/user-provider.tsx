import React, { useState } from "react";
import { Provider } from "./user-context";
import { User, Secret } from "types";
import axios from "axios";

type Props = { children: React.ReactNode };
const PlacesProvider = (props: Props) => {
  const [user, setUser] = useState<User>();
  const [isAuth, setIsAuth] = useState(false);
  const [secrets, setSecrets] = useState<Secret>();

  const login = async () => {
    try {
      const { user, access_token, refresh_token } = await axios
        .post("/auth/login", {
          username: "admin",
          password: "admin",
        })
        .then((res) => res.data);

      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      setIsAuth(true);
      setUser(user);
      setSecrets({ access_token, refresh_token });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Provider
      value={{
        user,
        isAuth,
        login,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default PlacesProvider;
