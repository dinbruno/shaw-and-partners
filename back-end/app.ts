import "express-async-errors";
import express from "express";
import cors from "cors";
import fileRoutes from "./src/routes/file.routes";
import userRoutes from "./src/routes/user.routes";
import requestLoggerMiddleware from "./src/middlewares/requestLogger.middleware";
import errorHandlingMiddleware from "./src/middlewares/errorHandling.middleware";

const app = express();

const corsOptions = {
  origin: ["http://localhost:4000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(requestLoggerMiddleware);

app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandlingMiddleware);

export default app;
