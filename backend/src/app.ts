import "express-async-errors";
import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes";
import userRoutes from "./routes/user.routes";
import requestLoggerMiddleware from "./middlewares/requestLogger.middleware";
import errorHandlingMiddleware from "./middlewares/errorHandling.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLoggerMiddleware);

app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);


app.use(errorHandlingMiddleware);

export default app;
