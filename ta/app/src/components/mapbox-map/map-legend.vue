<template>
  <div class="layer-legend">
    <img
      :src="legendUrl"
      class="layer-legend__image"
      alt="legend"
    >
  </div>
</template>

<script>
import buildLegendUrl from '@/lib/build-legend-url';
import debounce from 'lodash/debounce'
export default {
  props: {
    legendLayer: {
      type: String,
      required: true
    },
    baseUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      zoomLevel: 10
    }
  },
  computed: {
    legendUrl() {
      const scale = this.zoomLevel
      return buildLegendUrl({
        layer: this.legendLayer,
        url: this.baseUrl,
        width: 40,
        height: 20,
        scale
      });
    },
  },
  mounted() {
    const map = this.$root.map

    map.on('zoom', () => {
      this.setZoomLevel()
    })
  },
  methods: {
    setZoomLevel: debounce(function () {
      const map = this.$root.map
      const zoom = map.getZoom()
      this.zoomLevel = zoom
    }, 200)
  }
};
</script>

<style>
  .layer-legend {
    position: absolute;
    bottom: 2rem;
    left: .5rem;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  .layer-legend__image {
    height: 100%;
    border-radius: 4px;
  }
</style>