import axios from "axios";
//import { API_KEY } from "./credentials.json";

const instance = axios.create({
  baseURL: "https://cloud.iexapis.com/"
});


//const fetchData = async (symbol: string) => {
//  const response = await axios.get(
//  );
//  console.log(response.data);
//};

//export { fetchData };
