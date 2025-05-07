import axios from "axios";

export const getNodesByType = async (type: string) => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/nodes?type=${type}`
  );
  return response.data;
};
