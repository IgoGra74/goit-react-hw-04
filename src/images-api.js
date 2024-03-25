import axios from "axios";

export const fetchImagesWithTopic = async (topic, currentPage) => {
  const BASE_URL = "https://api.unsplash.com";
  const END_POINT = "/search/photos/";
  const ACCESS_KEY = "ePieEpooHVSDfaLGZpFPpKrHAmfSzEKF9sh9R4gAZaU";
  const url = `${BASE_URL}${END_POINT}`;

  const option = {
    params: {
      client_id: ACCESS_KEY,
      query: topic,
      orientation: "landscape",
      page: currentPage,
      per_page: 16,
    },
  };

  const response = await axios.get(url, option);

  return response.data.results;
};
