function extractExtension(page) {
  return page.split(".js")[0];
}

function toRoute(id) {
  const name = id.replaceAll("-", " ");

  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    id,
  };
}

// eslint-disable-next-line
export default LAYER_PAGES.map(extractExtension).map(toRoute);
