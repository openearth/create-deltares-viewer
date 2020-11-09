export default function findInTree(
  layers = [],
  key = 'id',
  value,
) {
  const path = '*'

  if (layers && layers.length) {
    if (typeof value === "object") {
      value = value[key];
    }
    for (let i = 0; i < layers.length; i++) {
      const item = layers[i];
      if (!item) {
        continue;
      }
      if (item[key] === value) {
        return item;
      } else if (item.children && item.children.length) {
        let checkChildren = true;
        if (Array.isArray(path)) {
          const pathIndex = path.findIndex((check) => check === item[key]);
          if (pathIndex !== -1) {
            path.splice(pathIndex, 1);
          } else {
            checkChildren = false;
          }
        }
        if (checkChildren) {
          const foundInChild = findInTree(item.children, key, value);
          if (foundInChild) {
            return foundInChild;
          }
        }
      }
    }
  }

  return null;
}
