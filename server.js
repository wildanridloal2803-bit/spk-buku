import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();

/* ==============================
   CORS (Vercel + Local Friendly)
================================ */
const allowedOrigins = [
  "http://localhost:5173",
  "https://spk-bukufe.vercel.app/"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server & tools like Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
  })
);

// Preflight support
app.options("*", cors());

/* ==============================
   BODY PARSER
================================ */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ==============================
   ROUTES
================================ */
app.use(router);

/* ==============================
   HEALTH CHECK (OPTIONAL)
================================ */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    env: process.env.NODE_ENV || "unknown"
  });
});

/* ==============================
   IMPORTANT PART
   ❌ NO app.listen()
   ✅ EXPORT app
================================ */
export default app;
