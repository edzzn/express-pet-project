import express from "express";
import morgan from "morgan";
import path from "path";
import { errorHandler, handle404 } from "./core/controller";
import { mainRouter } from "./router";

const app = express();
const PORT = 8000;

app.use(express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("combined"));

app.use("/", mainRouter);
app.use(handle404);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
