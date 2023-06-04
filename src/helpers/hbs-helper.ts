/* eslint-disable prettier/prettier */
import handlebars from 'handlebars';

export function registerHandlebarsHelpers(): void {
  handlebars.registerHelper(
    'nestedProperty',
    function (parentObj, property, options) {
      const value = getProperty(parentObj, property);
      return value !== undefined ? options.fn(value) : options.inverse(this);
    },
  );

  function getProperty(obj, property) {
    const properties = property.split('.');
    let value = obj;

    for (let i = 0; i < properties.length; i++) {
      if (value === null || value === undefined) {
        return undefined;
      }

      value = value[properties[i]];
    }

    return value;
  }
}
