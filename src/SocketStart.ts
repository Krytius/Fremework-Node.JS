import { Chat } from "./socket/Chat";
import { ClientSocket } from "./socket/client/ClientSocket";

export class SocketStart {

    public socket;

    constructor(io: any) {
        this.socket = io;
        this.routes();
    }

    /**
     * Start socket endpoints
     */
    public routes() {
        
        this.socket.on('connection', function (socket) {

            ClientSocket.addClient(socket);

            console.log("Connection Cliente");
            console.log(ClientSocket.clientsCount());

            // Endpoints
            new Chat(socket);

            socket.on('disconnect', (reason) => {
                console.log("Disconnect Cliente");
                ClientSocket.removeClient(socket.id);
            });
        });

    }


}