<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">{{ $t('introduction') }}</h2>

      <v-divider class="mt-4 mb-4" />
    </div>

    <div v-html="content" />

    <div class="d-flex pt-4">
      <v-btn class="primary ml-auto" :to="nextPage.id">{{ $t('get_started') }}</v-btn>
    </div>
  </div>
</template>

<script>
import pages from '@/lib/get-data-pages'
import { importConfig } from '@/lib/config-utils'

export default {
  data() {
    return {
      nextPage: pages[0]
    }
  },
  computed: {
    content() {
      return importConfig(`content/${this.$i18n.locale}/introduction.md`)
    }
  }
};
</script>