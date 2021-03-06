import { ClientSocket } from "./client/ClientSocket";
import { Config } from "../Config";


export class Chat {

    public socket;

    constructor(socket) {
        this.socket = socket;
        this.socket.on('clientIdent', this.clientIdent.bind(this));
        this.socket.on('subjectIdent', this.subjectIdent.bind(this));
        this.socket.on('subjectEnter', this.subjectEnter.bind(this));
        this.socket.on('mensageSend', this.mensageSend.bind(this));
    }

    /**
     * Register
     * @param data 
     */
    private clientIdent(data) {
        this.socket.user = {};
        this.socket.user.nome = data.nome;
        this.socket.user.avatar = data.avatar;

        if (Config.DEBUG) {
            console.log(this.socket.user);
        }

        this.socket.emit('clientIdent', this.socket.user);
    }

    /**
     * List subject
     * @param data 
     */
    private subjectIdent(data) {
        let list = [
            {
                name: `Assunto 1`,
                id: 1
            },
            {
                name: `Assunto 2`,
                id: 2
            },
        ];

        this.socket.emit('subjectIdent', list);
    }

    /**
	 * Enter channel
     * @param data 
     */
    private subjectEnter(data) {
        this.socket.subject = data.id;

        if (Config.DEBUG) {
            console.log(this.socket.subject);
        }

        this.socket.emit('subjectEnter', this.socket.user);
    }

    /**
	 * Send message clients the channel
     * @param data 
     */
    private mensageSend(data) {
        let message = {
            from: this.socket.user.nome,
            text: data.message
        };

        if (Config.DEBUG) {
            console.log(message);
        }

        var clients = ClientSocket.getClients();
        for (var key in clients) {
            if (clients[key].subject == this.socket.subject) {
                clients[key].emit('mensageSend', message);
            }
        }
    }

}