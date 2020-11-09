# Create Deltares viewer

Create a deltares viewer with one command. These packages are included:

- [Vuetify](https://vuetifyjs.com)
- [Vue router](https://router.vuejs.org/)
- Mapbox through [vue2mapbox-gl](https://www.npmjs.com/package/vue2mapbox-gl)

## Usage

Run the following command to initialize your application:

### Create project

```sh
npx github:openearth/create-deltares-viewer
```

### Update configuration

Files to configure the application are located in the `/config` directory.

- `config.yaml`: the basic configuration of the application
- `/content`: text content and translation
- `/data`: files containing the data for the map layers

### Start application

Start the application from the `/app` directory with: 

```sh
npm run start
```
