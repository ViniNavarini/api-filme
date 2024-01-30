const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Awards = require("../models/Awards");

async function readFileAndRecord() {
  const filePath = path.join(__dirname, `../../src/movielist.csv`);

  // Lê o arquivo CSV e insere os dados no banco de dados
  try {
    // Lê o arquivo CSV e insere os dados no banco de dados
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv({ separator: ";" }));

    for await (const row of stream) {
      const producersWithCommas = row.producers.replace(/ and /g, ', ');
      // Verifica se o registro já existe com base no título do filme
      const [filme, created] = await Awards.findOrCreate({
        where: { title: row.title },
        defaults: {
          year: row.year,
          studios: row.studios,
          producers: producersWithCommas,
          winner: row.winner,
        },
      });

      if (!created) {
        console.log("Registro já existe:", filme.title);
      } else {
        console.log("Registro inserido:", filme.title);
      }
    }

    console.log("Processo de importação concluído.");
  } catch (error) {
    console.error("Erro ao importar CSV:", error);
  }
}

module.exports = readFileAndRecord;
