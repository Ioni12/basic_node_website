import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function renderHTML(templatePath, res) {
  fs.readFile(templatePath, "utf8", (err, data) => {
    if (err) {
      console.log("error readin file ", err);
      return res.status(500).send("server error");
    }
    res.send(data);
  });
}

app.get("/", (req, res) => {
  renderHTML(path.join(process.cwd(), "views", "index.html"), res);
});

app.get("/about", (req, res) => {
  renderHTML(path.join(process.cwd(), "views", "about.html"), res);
});

app.get("/contact", (req, res) => {
  renderHTML(path.join(process.cwd(), "views", "contact.html"), res);
});

app.get("/api/time", (req, res) => {
  res.json({
    time: new Date().toISOString(),
    message: "current server time",
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log(`contact from your submisions: ${name}, ${email}, ${message}`);
  res.json({
    success: true,
    message: "form submited successfuly",
  });
});

app.listen(5000, () => console.log("server is up"));
