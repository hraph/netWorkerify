import {ClientIdentifier, ClientType, TaskStatus} from "./ClientIdentifier";

const EurecaServer = require("eureca.io").Server;
const express = require('express')
    , app = express()
    , webServer = require('http').createServer(app);

/** @ignore */
declare var require: any;


export class Server {
    public clients: ClientIdentifier[] = [];
    private config: any = {};
    private server: any;
    private _internalActions(__this: Server){
        this.server.exports.ping = function() {
            __this.clients.filter(client => client.clientId == this.user.clientId).forEach(client => {
                client.latestReceivedPingTimestamp = Date.now();
            });
            return 1;
        };

        this.server.exports.task = {
            taskLaunched: function () {
                __this.clients.filter(client => client.clientId == this.user.clientId).forEach(client => {
                    client.taskStatus = TaskStatus.Running;
                });
            },
            taskStopped: function () {
                __this.clients.filter(client => client.clientId == this.user.clientId).forEach(client => {
                    client.taskStatus = TaskStatus.Idle;
                });
            },
            taskLog: function (log: any) {

            },
            result: function(result: any) {
                console.log("result");
            }
        };

        this.server.exports.cli = {
            ping: function() {
                __this.clients.filter(client => client.clientId == this.user.clientId).forEach(client => {
                   client.latestReceivedPingTimestamp = Date.now();
                });
                return "pong";
            },
            getWorkers: function() {
                return __this.clients.filter(client => client.clientType == ClientType.Worker);
            },
            getCLIs: function() {
                return __this.clients.filter(client => client.clientType == ClientType.RemoteCLI);
            },
            launchTasks: function () {
                let count = 0;
                __this.clients.filter(client => client.clientType == ClientType.Worker).forEach(client => {
                    __this.server.getClient(client.clientId).launchTask().catch((e: any) => {
                        console.log("Unable to stop task ", e);
                    });
                    ++count;
                });
                return count + " tasks launched successfully";
            },
            stopTasks: function () {
                let count = 0;
                __this.clients.filter(client => client.clientType == ClientType.Worker).forEach(client => {
                    __this.server.getClient(client.clientId).stopTask().catch((e: any) => {
                        console.log("Unable to stop task ", e);
                    });
                    ++count;
                });
                return count + " tasks stopped successfully";
            }
        }
    }

    constructor(config: any = {}){
        this.config = config;
        let __this = this; //Keep context

        this.server = new EurecaServer({
            authenticate: function(identifier: ClientIdentifier, next: Function){
                identifier.clientId = this.user.clientId; //Save socket clientId
                __this.clients.push(identifier);
                next();
            },
            prefix: "nbfy",
            allow: ["launchTask", "stopTask", "statusTask"]
        });
        this.server.attach(webServer);

        this.server.onMessage(function (msg: any) {
            console.log('RECV', msg);
        });

        this.server.onConnect(function(connection: any) {
           console.log("connection", connection);
           let client = connection.clientProxy;
            setTimeout(() => {
                //client.launchTask();
            }, 3000);
        });


        this.server.onDisconnect(function (connection: any) {
            __this.clients = __this.clients.filter(client => client.clientId !== connection.id); //Remove client from clients
            console.log('client %s disconnected', connection.id);
        });

        this.server.onError(function (e: any) {
            console.log('an error occured', e);
        });

        this._internalActions(this);
    }

    /**
     * Launch server
     */
    public connect(): void{
        if (!this.config.port)
            this.config.port = 8000;
        webServer.listen(this.config.port);
    }

    public addServerAction(name: string, callback: Function){
        this.server.exports[name] = callback;
    }

    public addWorkerTask(name: string){
        this.server.settings.allow.push(name);
    }
}
