import { getToken } from "./tokenStorage.js";

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
}

async function apiFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 204) {
    return null;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export function getCourses() {
  return apiFetch("/api/courses");
}

export function createCourse(courseData) {
  return apiFetch("/api/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
}

export function updateCourse(id, courseData) {
  return apiFetch(`/api/courses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(courseData),
  });
}

export function deleteCourse(id) {
  return apiFetch(`/api/courses/${id}`, {
    method: "DELETE",
  });
}

export function getReviews() {
  return apiFetch("/api/reviews");
}

export function createReview(reviewData) {
  return apiFetch("/api/reviews", {
    method: "POST",
    body: JSON.stringify(reviewData),
  });
}