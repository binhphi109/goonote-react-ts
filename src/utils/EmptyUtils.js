export function empty(v, allowZero) {
  const type = typeof v;

  if (type === 'undefined') {
    return true;
  }
  if (type === 'boolean') {
    return !v;
  }
  if (v === null) {
    return true;
  }
  if (v === undefined) {
    return true;
  }
  if (v instanceof Array) {
    if (v.length < 1) {
      return true;
    }
  } else if (type === 'string') {
    if (v.length < 1) {
      return true;
    }
    if (v === '0' && !allowZero) {
      return true;
    }
  } else if (v instanceof Date) {
    return false;
  } else if (type === 'object') {
    if (Object.keys(v).length < 1) {
      return true;
    }
  } else if (type === 'number') {
    if (v === 0 && !allowZero) {
      return true;
    }
  }
  return false;
}

export function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}
