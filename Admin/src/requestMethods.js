import axios from "axios";
const BASE_URL="https://api.aimtasker.com/api/v1/";
export const url="https://api.aimtasker.com";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGI2NzM2ZjJmZDM2YTBlMjA5YWE3MSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDQ5MTQ1MDUsImV4cCI6MTY0NTE3MzcwNX0.TRfdqYrZXhFrj7kYmpv1jnQtYMxMPu-unP-g9cYux4Q";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
