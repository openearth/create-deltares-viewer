<template>
  <div>
    <layer-list-controls
      :key="this.$route.params.id"
      :layers="layers"
      @layer-sorting-change="onLayerSortingChange"
      @active-layers-change="onActiveLayerChange"
      @legend-change="onLegendChange"
    />
  </div>
</template>

<script>
import { LayerListControls } from '@deltares/vue-components';
import { importConfig } from '@/lib/config-utils'

export default {
  components: {
    LayerListControls,
  },
  data() {
    return {
      activeLegend: null,
      layers: [],
      activeLayers: []
    }
  },
  watch: {
    $route: {
      immediate: true,
      async handler(newRoute) {
        const { id } = newRoute.params;
        this.layers = []
        await this.$nextTick()
        this.layers = importConfig(`data/${id}`);
      }
    }
  },
  methods: {
    onLayerSortingChange(newLayers) {
      this.layers = newLayers
    },
    onLegendChange(event) {
      this.$emit('legend-update', event)
    },
    onActiveLayerChange(activeLayers) {
      this.activeLayers = activeLayers
      this.$emit('active-layers-update', activeLayers)
    }
  }
};
</script>