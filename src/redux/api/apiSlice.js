import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});



// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants.js";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers) => {
//     // Attach token if available
//     const token = localStorage.getItem("token"); // or however you store it
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }

//     // Set default content type
//     headers.set("Content-Type", "application/json");

//     return headers;
//   },
// });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ["Product", "Order", "User", "Category"],
//   endpoints: () => ({}),
// });

