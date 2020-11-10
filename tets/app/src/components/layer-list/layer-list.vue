<template>
  <v-treeview
    :items="layersWithParents"
    @input="handleChange"
    selectable
    open-all
  >
    <template v-slot:label="{ item, selected }">
      <div class="d-flex align-center">
        <span
          class="sortable-handle"
          :data-id="item.id"
          :data-parent-id="item.parentId"
        >{{ item.name }}</span>
        <v-btn
          v-if="item.layer && selected"
          icon
          class="ml-auto"
          @click="handleLegendClick(item.id)"
        >
          <v-icon>
            mdi-card-bulleted{{
              item.id === activeLegend ? '' : '-off'
            }}-outline
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import findInTree from './find-in-tree';
import arrayMove from './array-move';
import addIndex from './add-index';
import deleteIndex from './delete-index';
import { Sortable } from 'sortablejs';
const parentIdSelector = 'data-parent-id';

export default {
  props: {
    layers: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    input: null,
    selected: [],
    activeLegend: ''
  }),
  computed: {
    layersWithParents() {
      return this.layers.map((layer) => {
        if (layer.children) {
          return {
            ...layer,
            children: layer.children.map((child) => {
              return {
                ...child,
                parentId: layer.id,
              };
            }),
          };
        }

        return layer;
      });
    },
    sortableConfig() {
      return {
        animation: 150,
        onUpdate: (event) => {
          this.handleOrderUpdate(event);
        },
      };
    },
  },
  watch: {
    activeLegend(value) {
      this.$emit('legendChange', value)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
  methods: {
    initSortable() {
      const $rootEl = document.querySelector('.v-treeview');
      const $childEls = document.querySelectorAll('.v-treeview-node__children');
      const $sortableEls = [$rootEl, ...$childEls];
      $sortableEls.forEach(this.makeSortable);
    },
    makeSortable(el) {
      Sortable.create(el, this.sortableConfig);
    },
    handleChange(ids) {
      this.selected = ids.map((id) => findInTree(this.layers, 'id', id).id);
      const id = ids[ids.length - 1]

      this.setActiveLegend(id)
      this.emitOutPut()
    },
    handleOrderUpdate(event) {
      const { oldDraggableIndex, newDraggableIndex, item: $item } = event;

      const $handle = $item.querySelector('.sortable-handle');
      const parentId = $handle.getAttribute(parentIdSelector);

      const list = parentId ? this.layers.find(({ id }) => parentId === id).children : this.layers
      arrayMove(list, oldDraggableIndex, newDraggableIndex)

      this.emitOutPut()
    },
    setActiveLegend(id) {
      if (this.selected.length === 1) {
        this.activeLegend = this.selected[0].id
      }

      if (!this.selected.map(layer => layer.id).includes(this.activeLegend)) {
        // if no layer is selected, set active layer to null
        if (!this.selected.length) {
          this.activeLegend = null
        } else {
          this.activeLegend = this.selected[0].id
        }
      }

      this.activeLegend = id
    },
    handleLegendClick(id) {
      this.activeLegend = id
    },
    emitOutPut() {
      const withIndex = addIndex(this.layers)
      const layers = this.selected.map(id => findInTree(withIndex, 'id', id))
      const sortedLayers = layers
        .sort((a, b) => b.index - a.index)
        .map(deleteIndex)

      this.$emit('change', sortedLayers);
    },
  },
};
</script>

<style>
.sortable-handle {
  cursor: move;
}
</style>
