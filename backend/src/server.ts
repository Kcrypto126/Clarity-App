import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { nodeRoutes } from "./routes/nodeRoutes";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || "3000", 10);

// Enable CORS for the Expo app
app.use(
  cors({
    origin: [
      process.env.EXPO_CLIENT_URL || "http://localhost:8081",
      "http://192.168.142.29:8081",
      // process.env.OTHER_CLIENT_URL || "http://localhost:3001"
    ],
  })
);

app.use(express.json());

// Routes
app.use("/api/nodes", nodeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
