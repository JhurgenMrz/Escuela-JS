import express from "express";
import dotenv from "dotenv";
import webpack from "webpack";
import main from "./routes/main";
import helmet from "helmet";
import axios from "axios";
import passport from "passport";
import boom from "@hapi/boom";
import cookieParser from "cookie-parser";
import { config } from "../../config";

dotenv.config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Basic Strategy
require("./utils/auth/strategies/basic");

app.use(express.static(`${__dirname}/public`));

if (ENV === "development") {
  console.log("Loading dev config");
  const webpackConfig = require("../../webpack.config");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: `http://localhost:${PORT}`,
    port: PORT,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable("x-powered-by");
}

app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }
      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }
        const { token, ...user } = data;
        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function(req, res, next) {
  const { body: user } = req;
  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: user
    });

    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
});

app.get("*", main);

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server on PORT http://localhost:${PORT}`);
});
