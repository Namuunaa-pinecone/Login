import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

const port = 8888;
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello get huselt");
});

app.post("/sign-in", (request, response) => {
  const { name, password } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }
    let savedData = data ? JSON.parse(data) : [];

    const registeredUser = savedData.filter(
      (user) => user.name === name && user.password === password
    );
    if (registeredUser.length > 0) {
      response.json({
        success: true,
        user: registeredUser[0],
      });
    } else {
      response.json({
        success: false,
      });
    }
  });
});

app.post("/sign-up", (request, response) => {
  const { name, email, password } = request.body;

  fs.readFile("./data/user.json", "utf-8", (readError, data) => {
    let savedData = data ? JSON.parse(data) : [];

    if (readError) {
      response.json({
        success: false,
        error: error,
      });
    }

    console.log(data);

    const newUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      password: password,
    };
    savedData.push(newUser);

    fs.writeFile("./data/user.json", JSON.stringify(savedData), (error) => {
      if (error) {
        response.json({
          success: false,
          error: error,
        });
      } else {
        response.json({
          success: true,
          user: newUser,
        });
      }
    });
  });
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
