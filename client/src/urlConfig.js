// development
// export const api = "http://localhost:5000/api";
// export const rootDir = "http://localhost:3000";
// export const imageDir = "http://localhost:5000/client-static-images";
// export const userFilesDir = "http://localhost:5000/userFiles";
// export const productImageDir = "http://localhost:5000/";

// development alt
const ip = "192.168.0.108";
export const api = `http://${ip}:5000/api`;
export const rootDir = `http://${ip}:3000`;
export const imageDir = `http://${ip}:5000/client-static-images`;
export const userFilesDir = `http://${ip}:5000/userFiles`;
export const productImageDir = `http://${ip}:5000/`;

//embedded map
require("dotenv").config();
export const Map_loc = process.env.MAP_API_KEY;
