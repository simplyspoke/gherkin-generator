import Contemplated from './contemplated';

describe('Contemplated', () => {
  let contemplated;

  beforeEach(() => {
    contemplated = new Contemplated();
  });

  describe('run method', () => {
    it('should return true.', () => {
      expect(contemplated.run()).toBeTruthy();
    });
  });
});
