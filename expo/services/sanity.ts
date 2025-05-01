import axios from "axios";

export const getNodesByType = async (type: string) => {
  console.log("Here is the backend url", process.env.EXPO_PUBLIC_BACKEND_URL);
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/nodes?type=${type}`
  );
  return response.data;
};
