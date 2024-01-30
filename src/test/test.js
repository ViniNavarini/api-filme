const AwardsService = require('../services/AwardsService');

describe('readAwardsDatabase', () => {
    test('deve retornar os maiores e menores intervalos corretamente', async () => {
      this.awardsService = new AwardsService()
        const result = await this.awardsService.readAwardsDatabase();
  
      expect(result).toHaveProperty('min');
      expect(result).toHaveProperty('max');
  
      // Verifica se os valores retornados para os maiores intervalos estão corretos
      expect(result.max).toHaveLength(1);
      expect(result.max[0].producer).toBe('Matthew Vaughn');
      expect(result.max[0].interval).toBe(13);
      expect(result.max[0].previousWin).toBe(2002);
      expect(result.max[0].followingWin).toBe(2015);
  
      // Verifica se os valores retornados para os menores intervalos estão corretos
      expect(result.min).toHaveLength(1);
      expect(result.min[0].producer).toBe('Joel Silver');
      expect(result.min[0].interval).toBe(1);
      expect(result.min[0].previousWin).toBe(1990);
      expect(result.min[0].followingWin).toBe(1991);
    });
  });
  