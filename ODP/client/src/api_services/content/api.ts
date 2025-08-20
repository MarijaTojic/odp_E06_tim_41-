import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // tvoj backend
});

// Content API
export const getContents = async () => {
  const res = await api.get("/content");
  return res.data;
};

export const getContentById = async (id: number) => {
  const res = await api.get(`/content/${id}`);
  return res.data;
};

export const createContent = async (data: any) => {
  const res = await api.post("/content", data);
  return res.data;
};

// Rating API
export const addRating = async (contentId: number, userId: number, ratingValue: number) => {
  const res = await api.post("/rating", { contentId, userId, ratingValue });
  return res.data;
};
