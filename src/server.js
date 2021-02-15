import "dotenv/config";
import express from "express";
import routes from "./routes";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

/* global middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

/* routes */
app.get("/", (req, res) => {
  res.send("Welcome to this very resty foody API!");
});
app.use("/api/restaurants", routes.restaurants);

/* catch accessing non-existent endpoints */
app.use((req, res) => {
  res.status(404).send({ error: "You tried to access an unknown endpoint!" });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}!`)
);
