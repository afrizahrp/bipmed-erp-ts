import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL + "/api/cms";

export const api = axios.create({
  baseURL,
});
