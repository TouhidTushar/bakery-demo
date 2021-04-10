// main
// exports.serverRoot = "http://localhost:5000";
// exports.clientRoot = "http://localhost:3000";
// exports.adminRoot = "http://localhost:4000";

// ngrok test
// const port = -----;
// exports.serverRoot = `http://0.tcp.in.ngrok.io:${port}`;
// exports.clientRoot = `http://8.tcp.ngrok.io:-----`;
// exports.adminRoot = `http://8.tcp.ngrok.io:-----`;

// local test
const ip = "192.168.0.108";
exports.serverRoot = `http://${ip}:5000`;
exports.clientRoot = `http://${ip}:3000`;
exports.adminRoot = `http://${ip}:4000`;
