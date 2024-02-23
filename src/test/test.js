const AwardsService = require("../services/AwardsService");

describe("readAwardsDatabase", () => {
  test("deve retornar os maiores e menores intervalos corretamente", async () => {
    this.awardsService = new AwardsService();
    const result = await this.awardsService.readAwardsDatabase();

    expect(result).toHaveProperty("min");
    expect(result).toHaveProperty("max");

    // Verifica os resultados da função com os dados reais fornecidos
    expect(result.min).toHaveLength(2);

    // Verifica o primeiro resultado do intervalo mínimo
    expect(result.min[0].producer).toBe("Matthew Vaughn");
    expect(result.min[0].interval).toBe(1);
    expect(result.min[0].previousWin).toBe(2002);
    expect(result.min[0].followingWin).toBe(2003);

    // Verifica o segundo resultado do intervalo mínimo
    expect(result.min[1].producer).toBe("Joel Silver");
    expect(result.min[1].interval).toBe(1);
    expect(result.min[1].previousWin).toBe(1990);
    expect(result.min[1].followingWin).toBe(1991);

    // Verifica os resultados do intervalo máximo
    expect(result.max).toHaveLength(2);

    // Verifica o primeiro resultado do intervalo máximo
    expect(result.max[0].producer).toBe("Matthew Vaughn");
    expect(result.max[0].interval).toBe(22);
    expect(result.max[0].previousWin).toBe(1980);
    expect(result.max[0].followingWin).toBe(2002);

    // Verifica o segundo resultado do intervalo máximo
    expect(result.max[1].producer).toBe("Matthew Vaughn");
    expect(result.max[1].interval).toBe(22);
    expect(result.max[1].previousWin).toBe(2015);
    expect(result.max[1].followingWin).toBe(2037);
  });
});
