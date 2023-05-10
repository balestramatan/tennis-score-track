import axios from "axios";
import { StatisticsResponse } from "../infrastructure/Responses.interface";
import { User } from "../interfaces/userInterfaces";

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await axios.get("http://localhost:3000/users");

  return data;
};

export const signUp = async (firstName: string, lastName: string, phoneNumber: string, password: string): Promise<User> => {
  const { data } = await axios.post("http://localhost:3000/users/signup", {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    password
  });

  return data;
};

export const login = async (phoneNumber: string, password: string): Promise<User> => {
  const { data } = await axios.post("http://localhost:3000/users/login", {
    phone_number: phoneNumber,
    password
  });

  return data;
};

export const getStatistics = async (userId?: number): Promise<StatisticsResponse> => {
  if (!userId) return { wins: 0, losses: 0 };

  const { data } = await axios.get(`http://localhost:3000/users/${userId}/statistics`);

  return data;
};
