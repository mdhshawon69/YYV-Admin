/* eslint-disable prettier/prettier */
import Handlebars from 'handlebars';
export function eq(condition, matcher, value1, value2) {
  return condition === matcher ? value1 : value2;
}

export function trim(passedString) {
  const theString = passedString.substring(0, 15);
  return new Handlebars.SafeString(theString);
}
