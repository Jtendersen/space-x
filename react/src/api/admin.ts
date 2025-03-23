import axios from "utils/axios";

export const login = async (userId: string) => {
  const { data } = await axios.post("/admin/token", { userId });
  return data.token;
};
