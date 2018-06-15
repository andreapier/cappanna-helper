export default (source, target, objectSelector) => {
  if (source === target) {
    return true;
  }

  if (source.length !== target.length) {
    return false;
  }

  for (var i = 0, l = source.length; i < l; i++) {
    if (source[i] instanceof Array && array[i] instanceof Array) {
      if (!areEqual(source[i], array[i])) {
        return false;
      }
    } else if (source[i] !== target[i]) {
      if (objectSelector) {
        if (objectSelector(source[i]) != objectSelector(target[i])) {
          return false;
        }
      }

      return false;
    }
  }

  return true;
};
