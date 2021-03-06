"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const ClientIdentifier_1 = require("../models/ClientIdentifier");
class ServerStatus {
    static getServerStatusData(server) {
        return {
            connectedWorkers: server.clients.filter((x) => x.clientType == ClientIdentifier_1.ClientType.Worker).length,
            connectedClis: server.clients.filter((x) => x.clientType == ClientIdentifier_1.ClientType.RemoteCLI).length,
            launchedTasks: server.clients.filter((x) => x.taskStatus == ClientIdentifier_1.TaskStatus.Running).length
        };
    }
    static printServerStatus(server) {
        let status = this.getServerStatusData(server);
        logger_1.logger.server().info("%d worker(s) connected, %d/%d launched, %d CLI(s) connected", status.connectedWorkers, status.launchedTasks, status.connectedWorkers, status.connectedClis);
    }
}
exports.ServerStatus = ServerStatus;
//# sourceMappingURL=ServerStatus.js.map