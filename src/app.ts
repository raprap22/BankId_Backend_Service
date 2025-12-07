import express from "express";
import authRoute from "./routes/auth.routes";
import accountRoutes from "./routes/account.routes";
import depositoRoutes from "./routes/deposito.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/account", accountRoutes);
app.use("/deposito", depositoRoutes);

export default app;
