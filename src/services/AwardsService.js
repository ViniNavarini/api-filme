const Awards = require("../models/Awards");

class AwardsService {
  async readAwardsDatabase() {
    try {
      const awards = await Awards.findAll({
        where: {
          winner: "yes",
        },
        order: [["year", "ASC"]],
      });
      let rangerAwardMax = {
        producer: "",
        interval: 0,
        previousWin: 0,
        followingWin: 0,
      };
      let rangerAwardMin = {
        producer: "",
        interval: 0,
        previousWin: 0,
        followingWin: 0,
      };
      // agrupa itervalos por produtores
      let intervalos = {};
      awards.forEach((award) => {
        const produtores = award.producers.split(",").map((p) => p.trim());
        produtores.forEach((produtor) => {
          if (!intervalos[produtor]) {
            intervalos[produtor] = [];
          }
          intervalos[produtor].push(award.year);
        });
      });

      // busca maiores intevalor
      let maioresIntervalos = {};
      for (let produtor in intervalos) {
        const anos = intervalos[produtor].sort((a, b) => a - b);
        let maiorIntervalo = 0;
        let inicioIntervalo = 0;
        let fimIntervalo = 0;

        for (let i = 1; i < anos.length; i++) {
          const intervalo = anos[i] - anos[i - 1];
          if (intervalo >= maiorIntervalo) {
            maiorIntervalo = intervalo;
            inicioIntervalo = anos[i - 1];
            fimIntervalo = anos[i];
            if (!maioresIntervalos[produtor]) {
              maioresIntervalos[produtor] = [
                {
                  maiorIntervalo,
                  inicioIntervalo,
                  fimIntervalo,
                },
              ];
            } else {
              maioresIntervalos[produtor].push({
                maiorIntervalo,
                inicioIntervalo,
                fimIntervalo,
              });
            }
          }
        }
      }

      // Encontrar o maior intervalo
      const maiorIntervalo = Math.max(
        ...Object.values(maioresIntervalos).map((item) =>
          Math.max(...item.map((intervalo) => intervalo.maiorIntervalo))
        )
      );

      // Filtrar os registros com o maiorIntervalo
      const max = Object.entries(maioresIntervalos).flatMap(
        ([chave, valores]) =>
          valores
            .filter((valor) => valor.maiorIntervalo === maiorIntervalo)
            .map((valor) => {
              rangerAwardMax.producer = chave;
              rangerAwardMax.interval = valor.maiorIntervalo;
              rangerAwardMax.previousWin = valor.inicioIntervalo;
              rangerAwardMax.followingWin = valor.fimIntervalo;
              return { ...rangerAwardMax };
            })
      );

      // buscar menores intevalos
      let menoresIntervalos = {};
      for (let produtor in intervalos) {
        const anos = intervalos[produtor].sort((a, b) => a - b);
        let menorIntervalo = Infinity;
        let inicioIntervalo = 0;
        let fimIntervalo = 0;

        for (let i = 1; i < anos.length; i++) {
          const intervalo = anos[i] - anos[i - 1];
          if (intervalo < menorIntervalo) {
            menorIntervalo = intervalo;
            inicioIntervalo = anos[i - 1];
            fimIntervalo = anos[i];

            if (!menoresIntervalos[produtor]) {
              menoresIntervalos[produtor] = [
                {
                  menorIntervalo,
                  inicioIntervalo,
                  fimIntervalo,
                },
              ];
            } else {
              menoresIntervalos[produtor].push({
                menorIntervalo,
                inicioIntervalo,
                fimIntervalo,
              });
            }
          }
        }
      }

      // econtra o menor valor
      const menorValor = Math.min(
        ...Object.values(menoresIntervalos).flatMap((item) =>
          item.map((interval) => interval.menorIntervalo)
        )
      );

      // Filtrar os registros com o menorItevarlo
      const min = Object.entries(menoresIntervalos).flatMap(
        ([chave, valores]) =>
          valores
            .filter((valor) => valor.menorIntervalo === menorValor)
            .map((valor) => {
              rangerAwardMin.producer = chave;
              rangerAwardMin.interval = valor.menorIntervalo;
              rangerAwardMin.previousWin = valor.inicioIntervalo;
              rangerAwardMin.followingWin = valor.fimIntervalo;
              return { ...rangerAwardMin };
            })
      );

      return { min: min, max: max };
    } catch (error) {
      console.error("Erro ao recuperar filmes do banco de dados:", error);
      return error;
    }
  }
}
module.exports = AwardsService;
