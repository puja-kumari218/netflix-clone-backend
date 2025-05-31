import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import healthcheckRoute from "../routes/healthcheck.route.js";
import authRoute from "../routes/auth.route.js";

app.use("/api/healthcheck", healthcheckRoute);
app.use("/api/auth", authRoute);

export { app };
