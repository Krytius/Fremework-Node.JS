/**
 * Control clients ON
 */
export class ClientSocket {

    /**
     * List
     * {
     *  'idSocketCliente': socketObjeto
     * }
     */
    private static clients = {};

    /**
     * Add client
     * @param socket Objeto Socket
     */
    public static addClient(socket) {
        this.clients[socket.id] = socket;
    }

    /**
	 * Remove client
     * @param id idSocketCliente
     */
    public static removeClient(id) {
        delete this.clients[id];
    }

    /**
	 * Get client
     * @param id idSocketCliente
     */
    public static getClient(id) {
        return this.clients[id];
    }

    /**
     * All clients
     */
    public static getClients() {
        return this.clients;
    }

    /**
	 * Num clients ON
     */
    public static clientsCount() {
        let cont = 0;
        for (var key in this.clients) {
            cont++;
        }
        return cont;
    }
}