import axios from "axios";

const instance = axios.create({ baseURL: "https://api.unsplash.com" });

export const fetchImagesWithTopic = async (topic = "", page) => {
  const ACCESS_KEY = "ePieEpooHVSDfaLGZpFPpKrHAmfSzEKF9sh9R4gAZaU";

  const option = {
    params: {
      client_id: ACCESS_KEY,
      query: topic,
      orientation: "landscape",
      page: page,
      per_page: 16,
    },
  };

  const { data } = await instance.get(`/search/photos/`, option);

  return data;
};
