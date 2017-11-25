export class ClientSocket {

    private static clients = {};

    public static addClient(socket) {
        this.clients[socket.id] = socket;
    }

    public static removeClient(id) {
        delete this.clients[id];
    }

    public static getClient(id) {
        return this.clients[id];
    }

    public static getClients() {
        return this.clients;
    }

    public static clientsCount() {
        let cont = 0;
        for (var key in this.clients) {
            cont++;
        }
        return cont;
    }


}