"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Worker_1 = require("../src/Worker");
const ClientIdentifier_1 = require("../src/ClientIdentifier");
let identifier = new ClientIdentifier_1.ClientIdentifier("group1", "1");
let worker = new Worker_1.Worker({
    uri: "http://localhost:8000/",
    identifier: identifier
});
worker.onLaunchTask((server) => {
    console.log("launch", server);
});
//# sourceMappingURL=worker.js.map