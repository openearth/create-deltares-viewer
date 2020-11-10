<template>
  <v-app>
    <app-header />
    <app-sidebar
      @layersUpdate="layers = $event"
      @legendUpdate="legendLayer = $event"
    />
    <v-main>
      <mapbox-map
        v-if="acceptedLegal"
        :layers="layers"
        :legend-layer="legendLayer"
      />
    </v-main>
    <legal-dialog
      @accepted="onLegalAccepted"
    />
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from "@/components/legal-dialog";

export default {
  name: "App",
  components: {
    MapboxMap: () => import('@/components/mapbox-map'),
    AppHeader,
    AppSidebar,
    LegalDialog
  },
  data() {
    return {
      layers: [],
      legendLayer: null,
      acceptedLegal: false
    }
  },
  watch: {
    '$route'() {
      this.reset()
    }
  },
  methods: {
    reset() {
      this.layers = []
      this.legendLayer = ''
    },
    onLegalAccepted() {
      this.acceptedLegal = true
    }
  }
};
</script>
