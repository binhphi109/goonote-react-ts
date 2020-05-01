import uuid from 'uuid';
import { empty } from './EmptyUtils';
import { matchTextIgnoreCase } from './SearchUtils';

export function list2map(list) {
  if (empty(list)) {
    return {};
  }

  return list.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});
}

/**
 * Merge many arrays into one array.
 * Each item in the output array appears only once.
 * For example:
 * Input: [ [1, 2, 3], [101, 2, 1, 10], [2, 1] ]
 * Output: [1, 2, 3, 101, 10]
 * @param arr list of arrays
 * @returns {*[]}
 */
export function mergeArrayUnique(arr) {
  return [...new Set([].concat(...arr))];
}

export function filter(array, field, value, exactMatch) {
  if (!array) {
    return [];
  }

  return array.filter(item => (exactMatch ? item[field] === value : item[field].startsWith(value)));
}

export function find(array, field, value) {
  if (!array) {
    return [];
  }

  return array.filter(item => matchTextIgnoreCase(value, item[field]));
}

export function between(array, value) {
  if (!array) {
    return [];
  }

  return array.filter(item => (value > item.min || (item.min === 0 && value === 0)) && value <= item.max)[0];
}

export function remove(items, index) {
  if (index == null) {
    throw new Error('index should not be undefined.');
  }

  return [...items.slice(0, index), ...items.slice(index + 1, items.length)];
}

export function insert(items = [], item, index) {
  if (index != null) {
    return [...items.slice(0, index), item, ...items.slice(index, items.length)];
  }
  return [...items, item];
}

export function dictToArray(dict) {
  return Object.values(dict).reduce((acc, next) => acc.concat(next), []);
}

export function summarizeNumbers(array) {
  let result = '';
  array = array.sort((a, b) => a - b);

  if (array && array.length > 0) {
    let first = array[0];
    let prev = null;

    array.forEach(number => {
      if (prev !== null) {
        if (number - prev.number > 1) {
          if (prev.distance === 0) {
            result += `${result.length > 0 ? ',' : ''}${first}`;
          } else {
            result += `${result.length > 0 ? ',' : ''}${first}${prev.distance > 1 ? '-' : ','}${prev.number}`;
          }
          first = number;
        }
      }

      prev = {
        number,
        distance: number - first,
      };
    });

    if (prev.number !== array[0]) {
      if (prev.distance === 0) {
        result += `${result.length > 0 ? ',' : ''}${first}`;
      } else {
        result += `${result.length > 0 ? ',' : ''}${first}${prev.distance > 1 ? '-' : ','}${prev.number}`;
      }
    } else {
      result += `${result.length === 0 ? first : ''}`;
    }
  }

  return result;
}
