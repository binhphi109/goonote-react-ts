export function getPath(obj, path = '') {
  return path
    .split('.')
    .reduce((out, key) => (out ? out[key] : undefined), obj);
}

export function setToPath(obj, path = '', value) {
  let i;
  path = path.split('.');
  for (i = 0; i < path.length - 1; i++) {
    obj = obj[path[i]];
  }

  obj[path[i]] = value;
}
