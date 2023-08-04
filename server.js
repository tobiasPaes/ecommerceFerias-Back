const http = require('http') //1
const app = require('./app') //5
const port = process.env.PORT || 3000 //2
const server = http.createServer(app) //3
server.listen(port) //4
