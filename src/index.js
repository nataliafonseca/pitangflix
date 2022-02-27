import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to PitangFlix" });
});

app.listen(PORT, () => {
  console.log(`Listening PORT: ${PORT}`);
});
