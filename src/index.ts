import express from "express";
import { flash } from "express-flash-message";
import { default as session } from "express-session";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import { errorHandler, handle404 } from "./core/controller";
import "./core/passport";
import { mainRouter } from "./router";

const app = express();
const PORT = 8000;

// express-session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: "flashMessage" }));

app.use(express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(morgan("combined"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", mainRouter);
app.use(handle404);
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
