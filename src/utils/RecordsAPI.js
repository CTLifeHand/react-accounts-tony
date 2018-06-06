import axios from 'axios'

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5b172ef5f5c9b700145511d3.mockapi.io"


export const getAll = () => axios.get(`${api}/api/v1/records`);
export const creat = (body) => axios.post(`${api}/api/v1/records`,body);
