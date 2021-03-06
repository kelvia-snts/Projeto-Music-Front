import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/urls";

export const useRequestData = (endpoint, initialState) => {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    axios
      .get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.log(error.response.data.message));
  }, [endpoint]);
  return data;
};
