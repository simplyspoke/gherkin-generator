import Contemplated from './contemplated';

describe('Contemplated', () => {
  let contemplated;

  beforeEach(() => {
    contemplated = new Contemplated();
  });

  it('should create a template, validate it, and process it.', () => {
    const variables = {
      priority: 'important',
      results: 'success'
    };
    const template = 'This is an ${priority} test, it is ${results}!';

    contemplated.createTemplate(template);
    contemplated.validate(variables);

    expect(contemplated.process(variables)).toEqual(
      'This is an important test, it is success!'
    );
  });

  it('should throw an error if the template is invalid and has tags without variables', () => {
    const variables = {
      priority: 'important'
    };
    const template = 'This is an ${priority} test, it is ${results}!';

    contemplated.createTemplate(template);

    expect(() => {
      contemplated.validate(variables);
    }).toThrow('Cannot process template.');
  });
});
