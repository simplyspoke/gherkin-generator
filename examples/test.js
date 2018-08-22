const {Contemplated} = require('contemplated');

const contemplated = new Contemplated();

const template = 'This is an ${priority} test, it is ${results}!';
const variables = {
  priority: 'important',
  results: 'success'
};

contemplated.createTemplate(template);
contemplated.validate(variables);
console.log(contemplated.process(variables));
