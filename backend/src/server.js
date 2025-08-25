import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { rateLimiter } from './middlewares/ratelimiter.middleware.js';

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`${req.method}: ${req.url}`);
//     next();
// })

import notesRouter from "./routes/notes.routes.js"
app.use("/api/notes", notesRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    })
})