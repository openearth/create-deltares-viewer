export default function deleteIndex(layer) {
  delete layer.index
  return layer
}