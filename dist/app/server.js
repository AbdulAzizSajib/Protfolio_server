"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = require("./lib/prisma");
let server;
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Database connected successfully.");
        server = (0, node_http_1.createServer)(app_1.default);
        server.listen(env_1.envVars.PORT, () => {
            console.log(`Server is running on port ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("Error during server startup:", error);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
// SIGTERM signal handler
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received. Shutting down server...");
    if (server) {
        server.close(() => {
            console.log("Server closed gracefully.");
            process.exit(1);
        });
    }
    process.exit(1);
});
// SIGINT signal handler
process.on("SIGINT", () => {
    console.log("SIGINT signal received. Shutting down server...");
    if (server) {
        server.close(() => {
            console.log("Server closed gracefully.");
            process.exit(1);
        });
    }
    process.exit(1);
});
//uncaught exception handler
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception Detected... Shutting down server", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection Detected... Shutting down server", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//unhandled rejection handler
main();
//# sourceMappingURL=server.js.map