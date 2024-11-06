import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const port = 8888;
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const users = [
  { name: "namuun", age: 35 },
  { name: "munku", age: 37 },
];

app.get("/users", (request, response) => {
  response.json(users);
});

app.post("/", (request, response) => {
  console.log(request.body);
  response.send(`Body huselt`);
});

app.delete("/users", (request, response) => {
  const { id } = request.body;
  console.log(id);

  const filteredUser = users.filter((user) => user.id !== id);
  response.json(filteredUser);
});

app.listen(port, () => {
  console.log(`server ajillaj bn http://localhost:${port}`);
});
