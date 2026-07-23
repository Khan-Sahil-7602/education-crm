import { getToken } from "../utils/auth";

export async function getCustomerData(token) {
  const response = await fetch("http://localhost:8080/api/customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function getCustomerList() {
  const token = getToken();

  const response = await fetch(
    "http://localhost:8080/api/customer/getCustomers",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function getCustomerPurchasedCourse(userId) {
  const token = getToken();

  const response = await fetch(
    `http://localhost:8080/api/customer/courseDetails/${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function banUser(userId) {
  const token = getToken();

  const response = await fetch(
    `http://localhost:8080/api/customer/banUser?userId=${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Error while banning the user");
  }

  return result;
}

export async function unBanUser(userId) {
  const token = getToken();

  const response = await fetch(
    `http://localhost:8080/api/customer/unbanUser?userId=${userId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Error while unbanning the user");
  }

  return result;
}
