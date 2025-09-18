import axios from "axios";

const BASE_URL = import.meta.env.BASE_URL;

export const heroApi = axios.create({
    baseURL: `${BASE_URL}/api/heroes`
});