import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { rateLimiter } from './middlewares/ratelimiter.middleware.js';
import path from 'path';

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve() // gives root directory for backend i.e. /backend
console.log(__dirname);
console.log(path.join(__dirname, "../frontend", "dist"));
console.log(path.join(__dirname, "../frontend", "dist", "index.html"));


if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}
app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`${req.method}: ${req.url}`);
//     next();
// })

import notesRouter from "./routes/notes.routes.js"
app.use("/api/notes", notesRouter);

//prod setup
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "dist"))) // serving as static assets

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    })
})