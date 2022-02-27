import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";

import { handleErrors } from "./middleware/handleErrors.js";
import routes from "./routes/routes.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]", {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);
app.use(helmet());
app.use(cors());
app.use("/api", routes);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Listening PORT: ${PORT}`);
});
