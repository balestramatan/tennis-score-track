import axios from "axios";

export const fetchUserGames = async (user_id?: number) => {
  if (!user_id) return [];

  try {
    const response = await axios.get(`http://localhost:3000/games/${user_id}`);
    return await response.data;
  } catch (error) {
    console.log("error ::", error);
  }
};

export const addGame = async (game: any, user_id?: number) => {
  if (!user_id) return [];
  
  try {
    const { data } = await axios.post(`http://localhost:3000/games/${user_id}`, game);
    return data;
  } catch (error) {
    console.log("error ::", error);
  }
};
