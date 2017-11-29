import { Chat } from "./socket/Chat";
import { ClientSocket } from "./socket/client/ClientSocket";

export class SocketStart {

    public socket;

    constructor(io: any) {
        this.socket = io;
        this.routes();
    }

    /**
     * Inicializa endpoints do socket
     */
    public routes() {
        
        this.socket.on('connection', function (socket) {

            // Cliente adicionado a lista
            ClientSocket.addClient(socket);

            console.log("Connection Cliente");
            console.log(ClientSocket.clientsCount());

            // Endpoints de socket
            new Chat(socket);

            // Cliente desconectado
            socket.on('disconnect', (reason) => {
                console.log("Disconnect Cliente");
                ClientSocket.removeClient(socket.id);
            });
        });

    }


}