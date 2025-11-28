import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",

  prepareHeaders: (headers, { endpoint }) => {
    // ❗ Do NOT set JSON header for file upload
    if (endpoint !== "uploadImage") {
      headers.set("Content-Type", "application/json");
    }else{
          headers.set("Content-Type", "application/json");
    }

    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
