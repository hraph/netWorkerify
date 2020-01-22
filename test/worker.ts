import {ClientIdentifier, Server, Worker} from '../src';
import {TaskParameterList} from "../src/models/TaskParameters";
import {TaskIdentity} from "../src/models/TaskIdentity";
import {TunnelProvider} from "../src/models/WorkerTunnel";

let identifier = new ClientIdentifier("group1", "1");

let worker = new Worker({
    uri: "http://localhost:8000/",
    identifier: identifier,
    logger: 'debug',
    tunnelProvider: TunnelProvider.Ngrok,
    tunnelProviderConfig: {
        authtoken: process.env.AUTH_TOKEN
    }
});

worker.task.onLaunchTask((identity: TaskIdentity, parameters: TaskParameterList, server: any) => {
    console.log("launch", parameters);
    console.log("identity", identity);
    let buffer = "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ2REIyNjA5QjA2QjExRTU4ODY2REMyMDI4MjE1MkNEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ2REIyNjBBQjA2QjExRTU4ODY2REMyMDI4MjE1MkNEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDZEQjI2MDdCMDZCMTFFNTg4NjZEQzIwMjgyMTUyQ0QiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDZEQjI2MDhCMDZCMTFFNTg4NjZEQzIwMjgyMTUyQ0QiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEB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";
    worker.task.sendB64Image("test", "jpg", buffer);
    worker.task.sendTaskEvent("hello", ["h", "e", "l", "l", "o"]);
});

worker.task.onStopTask((server: any) => {
    console.log("stop");
    worker.task.sendTaskResult({didier: "ok"});
    worker.task.sendTaskEnded();
});

worker.events.onServerEvent("workerSayHello", (server: Server, data: any) => {
    worker.logger().info("workerSayHello");
    worker.task.sendTaskEvent("helloBack", "Hello");
});

/*function delay(){
    return new Promise(((resolve, reject) => {
        setTimeout(()=> resolve, 10000);
    }));
}*/

worker.task.onStatusTask(async function(server) {
    worker.logger().debug("Get status");
    //await delay();
    return {
        number: Math.random(),
        token: identifier.token
    }
});