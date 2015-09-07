searchObject = function(object, key, selectFirstIfIsArray) {
  key = key.split('.');

  try {
    for (var i = 0; i < key.length; i++) {
      if (selectFirstIfIsArray && object.length && object.length > 0) {
        object = object[0];
      }
      if (key[i] in object) {
        object = object[key[i]];
      } else {
        return null;
      }
    }
  } catch(error) {
    return null;
  }

  return object || null;
}