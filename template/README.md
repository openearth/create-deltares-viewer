# dr-viewer

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm serve
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Configuration

The configuration of this project lives in the /config directory.

### config.yml

This file contains the general configuration of the project. This file should contain the following properties:

```yaml
name: DR Viewer # full name of the application
shortName: DR # short name (will be used as title of the application in the header)

i18n: # overwrites the default i18n configuration. Allowed properties can be found here: https://kazupon.github.io/vue-i18n/api/#properties
  locale: es 

map:
  center: [-70.1654584, 18.7009047] # center of the map when initialized
  zoom: 7 # zoom level of the map when initialized
```

### data directory

This directory contains the files where WMS layers are configured. This files should follow the following pattern:

```json
[
  {
      "id": "geological-layout",
      "name": "Geological Layout2",
      "children": [
          {
              "id": "chw2:BDTICM_M_250m_ll",
              "name": "Depth to bedrock (cm)",
              "layer": "chw2:BDTICM_M_250m_ll",
              "url": "https://deltaresdata.openearth.eu/geoserver/chw2/ows"
          },
          {
              "id": "chw2:elevtn_1k",
              "name": "MERIT",
              "layer": "chw2:elevtn_1k",
              "url": "https://deltaresdata.openearth.eu/geoserver/chw2/ows"
          },
          {
              "id": "coast",
              "name": "Coast",
              "children": [
                  {
                      "id": "chw2:estuaries",
                      "name": "Estuaries",
                      "layer": "chw2:estuaries",
                      "url": "https://deltaresdata.openearth.eu/geoserver/chw2/ows"
                  }
              ]
          }
      ]
  }
]
```

### content directory

This is where the translated content lives. Content is divided in locales, each having their own directory. These locales are automatically made available in the application.