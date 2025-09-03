import { apiRequest } from "./queryClient";

export async function loginUser(email: string, password: string) {
  const response = await apiRequest("POST", "/api/auth/login", {
    email,
    password,
  });
  return response.json();
}

export async function signupUser(firstName: string, lastName: string, email: string, password: string) {
  const response = await apiRequest("POST", "/api/auth/signup", {
    firstName,
    lastName,
    email,
    password,
  });
  return response.json();
}

export async function logoutUser() {
  const response = await apiRequest("POST", "/api/auth/logout");
  return response.json();
}

export async function updateOnboarding(industry: string, experienceLevel: string, token: string) {
  const response = await fetch("/api/onboarding", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ industry, experienceLevel }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }

  return response.json();
}
