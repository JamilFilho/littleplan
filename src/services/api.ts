import axios from 'axios'

export const api = axios.create({
  baseURL: "https://raw.githubusercontent.com/JamilFilho/littleplan/main/db.json"
})