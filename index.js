const express = require("express");
const app = express();
const AwardsRoutes = require("./src/routes/AwardsRoutes");
const sequelize = require("./src/services/DatabaseService");
const readFileAndRecord = require("./src/services/FileService");

const port = process.env.PORT || 3000;

// Sincroniza o modelo com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    // le arquivo .csv e grava no banco de dados
    readFileAndRecord()
      .then(() => {
        console.log("Arquivo gravado no banco de dados");
        // Listen server
        app.listen(port, () => {
          // run data
          const date = new Date();
          // console display
          console.log(`Listen server https://localhost:${port} : ${date} \n`);
        });
      })
      .catch((err) => {
        console.error("Erro ao gravar no banco de dados:", err);
      });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", AwardsRoutes);

module.exports = app;
