/* eslint-disable prettier/prettier */
import Handlebars from 'handlebars';
export function eq(condition, matcher, value1, value2) {
  return condition == matcher ? value1 : value2;
}

export function trim(passedString) {
  const theString = passedString.substring(0, 15);
  return new Handlebars.SafeString(theString);
}

export function incIndex(index) {
  const increadedIndex = index + 1;
  return increadedIndex;
}

export function current(location) {
  const current = location.search.split('?page=')[1];
  console.log(current);
  return current;
}

export function queryVar(query) {
  return function () {
    return query;
  };
}

export function eqNav(matcher, value1, value2) {
  const href = location.href.includes(matcher);
  return href ? value1 : value2;
}
