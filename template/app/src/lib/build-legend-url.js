import buildGeoserverUrl from './build-geoserver-url';

export default ({ layer, url, scale, width = 40, height = 60 }) => buildGeoserverUrl({
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width,
  height,
  url,
  layer,
  scale
});
