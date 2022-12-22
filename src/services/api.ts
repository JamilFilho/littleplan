import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.API_URL || "https://my-json-server.typicode.com/JamilFilho/littleplan/db"
})