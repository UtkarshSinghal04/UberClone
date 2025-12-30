const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 5000;
const connectdb = require('./db/connect')

const server = http.createServer(app);

try {
    initializeSocket(server);
    console.log("Socket initialized successfully.");
} catch (err) {
    console.error("Error initializing socket:", err);
}

//connect Db and server start
const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI)
        server.listen(port, () => {
            console.log(`server is listening on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
