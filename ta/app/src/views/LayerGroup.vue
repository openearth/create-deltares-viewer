<template>
  <div>
    <layer-list
      :key="this.$route.params.id"
      :layers="layers"
      @change="$emit('layersUpdate', $event)"
      @legendChange="$emit('legendUpdate', $event)"
    />
  </div>
</template>

<script>
import LayerList from '@/components/layer-list';
import { importConfig } from '@/lib/config-utils'

export default {
  components: {
    LayerList,
  },
  data() {
    return {
      activeLegend: null
    }
  },
  computed: {
    layers() {
      const { id } = this.$route.params;
      return importConfig(`data/${id}`);
    },
  },
};
</script>