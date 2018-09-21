import { Tag } from './tag';

interface TemplateErrors {
  missing?: string[];
  noVariables?: boolean;
}

export enum TemplateStates {
  Initial = 'initial',
  Pending = 'pending',
  Invalid = 'invalid',
  Valid = 'valid'
}

/**
 * The base class for the Contemplated module
 */
export class Template {
  private tag: Tag;
  private template: string;
  private tags: Set<string>;
  errors: TemplateErrors = {
    missing: []
  };
  status: TemplateStates = TemplateStates.Initial;

  constructor(template: string, prefix = '${', suffix = '}') {
    this.tag = new Tag({ prefix, suffix });
    this.template = template;
    this.tags = new Set();

    this.addVariablesToSet();
  }

  private addVariablesToSet() {
    const tagStrings = this.template.match(this.tag.pattern);

    if (tagStrings === null) {
      this.status = TemplateStates.Invalid;
      this.errors.noVariables = true;
      return;
    }

    tagStrings
      .map(tagString => {
        return this.tag.getTagName(tagString);
      })
      .forEach(tag => {
        this.tags.add(tag);
      });
  }

  validate(variables: { [key: string]: any }) {
    if (this.status === TemplateStates.Invalid) {
      return;
    }

    this.status = TemplateStates.Pending;

    this.tags.forEach(value => {
      if (!variables.hasOwnProperty(value)) {
        this.status = TemplateStates.Invalid;
        this.errors.missing.push(value);
      }
    });

    if (this.errors.missing.length > 0) {
      return;
    }

    this.status = TemplateStates.Valid;
  }

  generate(variables: { [key: string]: any }) {
    let generated = this.template;

    this.tags.forEach(tag => {
      const tagString = `\$\{${tag}\}`;
      const value = variables[tag];

      generated = generated.replace(tagString, value);
    });

    return generated;
  }
}
