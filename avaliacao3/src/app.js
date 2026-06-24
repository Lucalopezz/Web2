import express from "express";
import routes from "./routes/index.js"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: "text/plain" }));

// Para validar se o body é um JSON válido, caso seja uma string
// No Postman usa o raw para mandar json, ai não era reconhecido como json
app.use((req, res, next) => {
  if (typeof req.body !== "string") {
    return next();
  }

  try {
    req.body = JSON.parse(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({ message: "JSON invalido!" });
  }
});

app.use(routes);

export default app;
