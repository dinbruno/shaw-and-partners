import "express-async-errors";
import express from "express";
import cors from "cors";
import fileRoutes from "./src/routes/file.routes";
import userRoutes from "./src/routes/user.routes";
import requestLoggerMiddleware from "./src/middlewares/requestLogger.middleware";
import errorHandlingMiddleware from "./src/middlewares/errorHandling.middleware";

const app = express();

const allowedOrigins = [
  "http://localhost:4000",
  "https://shaw-and-partners-app.vercel.app/",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(requestLoggerMiddleware);

app.use("/api/files", fileRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandlingMiddleware);

export default app;
