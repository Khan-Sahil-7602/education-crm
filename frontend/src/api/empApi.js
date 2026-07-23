import { getToken } from "../utils/auth";

const URL = "http://localhost:8080/api/emp";

export async function addEmp(empData) {
  const token = getToken();

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(empData),
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function getAllEmp() {
  const token = getToken();

  const response = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function fetchSingleEmployee(id) {
  const token = getToken();

  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function updateEmployee(id, empData) {
  const token = getToken();

  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(empData),
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function getCourseNameId() {
  const token = getToken();

  const response = await fetch(`${URL}/get-course`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function getOrderId(id) {
  const token = getToken();

  const response = await fetch(
    "http://localhost:8080/api/purchase/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        courseId: id,
      }),
    },
  );

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function sellCourse(courseData) {
  const token = getToken();

  const response = await fetch("http://localhost:8080/api/emp/sell-course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function addInquiry(inquiryData) {
  const token = getToken();

  const response = await fetch("http://localhost:8080/api/emp/add-inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inquiryData),
  });

  if (!response.ok) {
    return;
  }

  return await response.json();
}

export async function getInquiryData(phone) {
  const token = getToken();

  const response = await fetch(
    `http://localhost:8080/api/emp/inquiries?phone=${phone}`,
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

export async function getFollowUpPhoneNo(followUpDate) {
  const token = getToken();

  const response = await fetch(
    `http://localhost:8080/api/emp/getPhone?followUpDate=${followUpDate}`,
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

export async function getEmpIndivTotalSales() {
  const token = getToken();

  const response = await fetch("http://localhost:8080/api/emp/getIndivSales", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Fetch individual sale details failed!");
  }

  return result;
}

export async function getTotalSaleByEmp() {
  const token = getToken();

  const response = await fetch("http://localhost:8080/api/emp/getTotalSale", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error("Fetch total sales failed!");
  }

  return result;
}
