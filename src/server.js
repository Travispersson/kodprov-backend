import "dotenv/config";
import express from "express";
import routes from "./routes";
import models from "./models";

const app = express();

/* middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* allowed to access the models from context */
app.use(async (req, res, next) => {
  req.context = {
    models,
  };
  next();
});

/* routes */
app.get("/", (req, res) => {
  res.send("Welcome to this very resty foody API!");
});
app.use("/api/restaurants", routes.restaurants);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`)
);
