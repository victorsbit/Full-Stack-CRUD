import Joi from 'joi';
import { UserDTO } from '../interfaces/user';

export function toCamel(o: any): any {
  let newO: any;
  let origKey: string;
  let newKey: string;
  let value: any;

  if (Array.isArray(o)) {
    return o.map((value: any) => {
      if (typeof value === 'object') {
        value = toCamel(value);
      }
      return value;
    });
  } else {
    newO = {};
    for (origKey in o) {
      if (o.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
        value = o[origKey];
        if (Array.isArray(value) || (value !== null && value.constructor === Object)) {
          value = toCamel(value);
        }
        newO[newKey] = value;
      }
    }
  }
  return newO;
}
