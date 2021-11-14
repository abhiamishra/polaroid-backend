// entry point

import express from "express";
import cookieParser from "cookie-parser";
import { apiRouter } from "./apiRouter";
import cookie from "./middleware/cookie";
import cors from "cors";

const server = express();
const port = 8080;

server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
server.use(express.json());
server.use(cookieParser());
server.use(cookie);

server.use("/api", apiRouter);

server.listen(port, () => console.log(`Listening on port ${port}`));
