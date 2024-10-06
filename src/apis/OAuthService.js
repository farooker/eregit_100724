import axios from "axios";
 
// Create an Axios instance for OAuth-specific requests
const oauthAxios = axios.create({
  headers: {
    'Content-Type': import.meta.env.VITE_CONTENT_TYPE,  
  },
});
 
// Function to get OAuth token
const getAuthToken = async () => {
  const data = {
    grant_type: "grant_type",
    client_id: import.meta.env.VITE_CLIENT_ID,  
    client_secret: import.meta.env.VITE_CLIENT_SECRET  
  };
  console.log("datadatadata", data);
  console.log("URL", import.meta.env.VITE_AUTH_URL);  
 
  // Use the AUTH_URL from the .env file
  return await oauthAxios.post(import.meta.env.VITE_AUTH_URL, data);  
};
 
// Function to verify the token
const verifyToken = async (Authorization) => {
  const headers = {
    'Content-Type': import.meta.env.VITE_CONTENT_TYPE,  
    clientID: import.meta.env.VITE_CLIENT_ID,  
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,  
    Authorization: 'Bearer ' + Authorization,  
  };
 
  return await axios.get(import.meta.env.VITE_VERIFY_TOKEN_URL, { headers });  
};
 
// Function to decode the token
const decodeToken = async (Authorization, oauthToken) => {
  const headers = {
    Authorization: 'Bearer ' + Authorization,  
  };
 
  const data = { token: oauthToken };
 
  return await axios.post(import.meta.env.VITE_DECODE_TOKEN_URL, data, { headers });  
};
 
export default {
  getAuthToken,
  verifyToken,
  decodeToken
};