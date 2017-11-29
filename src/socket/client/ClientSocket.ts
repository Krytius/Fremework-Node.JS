/**
 * Controle de clientes do socket
 */
export class ClientSocket {

    /**
     * Lista de clientes
     * {
     *  'idSocketCliente': socketObjeto
     * }
     */
    private static clients = {};

    /**
     * Adiciona cliente a lista
     * @param socket Objeto Socket
     */
    public static addClient(socket) {
        this.clients[socket.id] = socket;
    }

    /**
     * Remove cliente da lista pelo idSocketCliente
     * @param id idSocketCliente
     */
    public static removeClient(id) {
        delete this.clients[id];
    }

    /**
     * Busca cliente específico pelo idSocketCliente
     * @param id idSocketCliente
     */
    public static getClient(id) {
        return this.clients[id];
    }

    /**
     * Lista com todos os clientes
     */
    public static getClients() {
        return this.clients;
    }

    /**
     * Contagem de clientes conectados
     */
    public static clientsCount() {
        let cont = 0;
        for (var key in this.clients) {
            cont++;
        }
        return cont;
    }


}