import axios from "axios";
import { Log } from "../utils/logger";

const API = axios.create({
  baseURL: "http://4.224.186.213/evaluation-service",
});

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwdW5lZXQuc2luZ2gyMDIzQGdsYmFqYWpncm91cC5vcmciLCJleHAiOjE3ODI0NTE3OTEsImlhdCI6MTc4MjQ1MDg5MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU1MjJjM2E2LWZiNWItNGM1ZC1iMjU5LWY0NmYwMTc3NzQ0NyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InB1bmVldCBzaW5naCIsInN1YiI6IjEyMzBmMWM2LTYzMDQtNGU1ZS04MThkLWJkOTI5NDNjZmM4MyJ9LCJlbWFpbCI6InB1bmVldC5zaW5naDIwMjNAZ2xiYWphamdyb3VwLm9yZyIsIm5hbWUiOiJwdW5lZXQgc2luZ2giLCJyb2xsTm8iOiIyMzA1MTExNTIwMDM3IiwiYWNjZXNzQ29kZSI6Inh4a0puayIsImNsaWVudElEIjoiMTIzMGYxYzYtNjMwNC00ZTVlLTgxOGQtYmQ5Mjk0M2NmYzgzIiwiY2xpZW50U2VjcmV0IjoiVlFqRkVYUkJ6d0R6Z1pxUCJ9.d9AJ9wy_2ilTikk79zgBybTE75H3m5JjEeMyuFgtprA";


export async function getNotifications(params = {}) {
  try {
    await Log(
      "frontend",
      "info",
      "api",
      "Fetching notifications"
    );

    const response = await API.get("/notifications", {
      params,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    await Log(
      "frontend",
      "error",
      "api",
      error.message
    );

    throw error;
  }
}