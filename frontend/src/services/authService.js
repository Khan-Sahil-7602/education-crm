import { getToken } from "../utils/auth";

const URL = "http://localhost:8080/api/auth";

export async function checkEmailExists(email) {
  const response = await fetch(
    `${URL}/emailExist?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
    },
  );

  return response.json();
}

export async function checkPhoneExists(phone) {
  const response = await fetch(
    `${URL}/phoneExist?phone=${encodeURIComponent(phone)}`,
    {
      method: "GET",
    },
  );

  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = result;
    throw error;
  }

  return result;
}

export async function loginUser(credentials) {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error();
    error.data = result;
    throw error;
  }

  return result;
}

export async function logoutUser() {
  const token = getToken();

  const response = await fetch(`${URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
