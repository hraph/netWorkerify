"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const src_2 = require("../src");
let identifier = new src_2.ClientIdentifier("RemoteCLI", "1");
let cli = new src_1.RemoteCLI({
    uri: "http://localhost:8000/",
    identifier: identifier,
    autoSubscribe: true,
    logger: 'debug'
});
cli.addCommand("test", "Write a test", (args, callback) => {
    console.log("TEST");
    callback();
});
//# sourceMappingURL=cli.js.map