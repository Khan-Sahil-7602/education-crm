export const parseJwt = (token) => {
  try {
    const base64PayLoad = token.split(".")[1];
    const jsonPayLoad = atob(base64PayLoad);
    return JSON.parse(jsonPayLoad);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getUserRole = () => {
  const token = getToken();

  if (!token) {
    return null;
  }

  const payLoad = parseJwt(token);

  return payLoad?.role || null;
};
