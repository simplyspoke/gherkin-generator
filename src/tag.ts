import * as escapeStringRegexp from 'escape-string-regexp';

export interface TagConfig {
  prefix: string;
  suffix: string;
}

/**
 * The base class for the Contemplated module
 */
export class Tag {
  private prefix: string;
  private suffix: string;
  pattern: RegExp;

  constructor({ prefix, suffix }: TagConfig) {
    this.prefix = prefix;
    this.suffix = suffix;

    this.setPattern();
  }

  getTagName(tag: string) {
    const beginsAfter: number = this.prefix.length;
    const endsAt: number = tag.length - this.suffix.length;

    return tag.substring(beginsAfter, endsAt);
  }

  private setPattern() {
    const escapedPrefix = escapeStringRegexp(this.prefix);
    const escapedSuffix = escapeStringRegexp(this.suffix);
    const regex = `(${escapedPrefix}(?:(?!${escapedPrefix}|${escapedSuffix}).)*${escapedSuffix})`;

    this.pattern = new RegExp(regex, 'gi');
  }
}
