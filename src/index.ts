import express from "express";
import path from "path";
import { mainRouter } from "./router";

const app = express();
const PORT = 8000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
