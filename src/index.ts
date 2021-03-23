import express from "express";
import morgan from "morgan";
import path from "path";
import { mainRouter } from "./router";

const app = express();
const PORT = 8000;

app.use(express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("combined"));

app.use("/", mainRouter);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
