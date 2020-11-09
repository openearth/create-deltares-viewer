// inverse index in array
function inverseIndex(arr, index) {
  return arr.length - index 
} 

export default function addIndex(layers) {
  return layers.map((layer, index) => {
    if (layer.children) {
      const inversedIndex = inverseIndex(layers, index);

      return {
        ...layer,
        children: layer.children.map((child, childIndex) => {
          const inversedChildIndex = inverseIndex(
            layer.children,
            childIndex
          );

          return {
            ...child,
            // index is used render layers in order, so highest one gets on top
            index: 10 * inversedIndex + inversedChildIndex,
          };
        }),
      };
    }

    return layer;
  });
}