import chalk from 'chalk';
import { Template, TemplateStates } from './template';

interface ContemplatedConfig {
  prefix?: string;
  suffix?: string;
}

/**
 * The base class for the Contemplated module
 */
export class Contemplated {
  private template: Template;
  private config: ContemplatedConfig;

  /**
   * Constructs the Contemplated object and assigns the config property
   * @param {ContemplatedConfig} config
   */
  constructor(config: ContemplatedConfig = {}) {
    console.log(chalk.yellow(`=========*** Contemplated ***==========`));
    this.config = config;
  }

  /**
   * Takes in a template string and uses it to create a new Template.
   * @param  {string} templateString
   */
  createTemplate(templateString: string) {
    this.template = new Template(
      templateString,
      this.config.prefix,
      this.config.suffix
    );
  }

  /**
   * Takes in the variables and uses them to check if the template is valid.
   * @param  {[key: string]: any} variables
   * @throws An error if the template is invalid.
   */
  validate(variables: { [key: string]: any }) {
    let errorMessage: string;
    this.template.validate(variables);

    if (this.template.status === TemplateStates.Invalid) {
      if (this.template.errors.noVariables) {
        errorMessage = 'A template must have at least one tag to be valid.';
      }
      if (this.template.errors.missing.length > 0) {
        errorMessage = `The template is invalid. The variables for the following tags were not found:\n
          ${this.template.errors.missing.join('\n')}`;
      }
      throw new Error(`${errorMessage} Cannot process template.`);
    }
  }

  /**
   * Processes the template using the provided variables and returns the results.
   * @param  {[key: string]: any} variables
   * @return     {string} Returns the processed template
   */
  process(variables: { [key: string]: any }): string {
    return this.template.generate(variables);
  }
}

export default Contemplated;
