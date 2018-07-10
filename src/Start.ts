import socketIO = require('socket.io')
import * as http from 'http';
import App from './App';
import * as redis from "redis";
import { Config } from './Config';
import { SocketStart } from './SocketStart';
import { isMaster, fork } from 'cluster';
import { cpus } from 'os';
import { CacheRedis } from '.';

function init() {
    const port = normalizePort(Config.PORT);
    App.set('port', port);

    const server = http.createServer(App);

    // Configuração de socket ligada inicializa o serviço de socket
    if (Config.SocketIO) {
        new SocketStart(socketIO(server));
    }

    if(Config.CACHE) {
        CacheRedis.client = redis.createClient(Config.REDIS);
        CacheRedis.client.on("connect", (resp) => {
            console.info("Cache Connected");
        })
    }

    function normalizePort(val: number | string): number | string | boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening(): void {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    }

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
    console.info(`Listening on port ${port}`);
}

if(Config.PRODUCTION) {
    if (isMaster) {
        for (let i = 0; i < cpus().length; i++) {
            fork();
        }
    } else {
        init();
    }
} else init();

