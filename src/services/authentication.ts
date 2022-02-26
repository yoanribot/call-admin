import axios from "axios";

export async function login (username: string, password: string) {
  try {
    const { user, access_token, refresh_token } = await axios
      .post("/auth/login", {
        username,
        password,
      })
      .then((res) => res.data);

      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const newUser = {
        ...user,
        access_token,
        refresh_token,
      };

      localStorage.setItem('currentUser', JSON.stringify(newUser));

      return newUser;
  } catch (error) {
    console.log(error);
  }
}

export function logout () {
  localStorage.removeItem('currentUser');
}

export function getUser () {
  const user = localStorage.getItem('currentUser');

  if (!!user) return JSON.parse(user);
}

export function updateAuthToken (token: string) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}