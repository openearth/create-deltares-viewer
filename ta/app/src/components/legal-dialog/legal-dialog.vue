<template>
  <v-dialog
    scrollable
    persistent
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :max-width="640"
  >
    <v-card class="d-flex flex-column" style="max-height: 100%;overflow:hidden">
      <v-card-title class="pa-5">
        <v-toolbar-title>{{ $t('user_agreement') }}</v-toolbar-title>
      </v-card-title>

      <div class="px-5 flex-grow-1 overflow-y-auto" v-html="content" />

      <v-card-actions>
        <div class="pa-2" style="width:100%">
          <form action="" submit.prevent>
            <v-checkbox
              :label="conditionsLabel"
              class="ma-0"
              v-model="acceptedConditions"
              hide-details
            />
            <v-checkbox
              :label="cookiesLabel"
              class="ma-0"
              v-model="acceptedCookies"
              hide-details
            />
          </form>
          <div class="mt-2 d-flex">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!allAccepted"
              @click="onStartClick"
            >
              {{ $t('i_agree') }}
            </v-btn>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { importConfig } from '@/lib/config-utils'

export default {
  data: () => ({
    show: true,
    acceptedConditions: false,
    acceptedCookies: false,
  }),
  computed: {
    allAccepted() {
      return this.acceptedConditions && this.acceptedCookies;
    },
    content() {
      return importConfig(`content/${this.$i18n.locale}/legal.md`)
    },
    conditionsLabel() {
      return this.$i18n.t('conditions_label')
    },
    cookiesLabel() {
      return this.$i18n.t('cookies_label')
    }
  },
  methods: {
    onStartClick() {
      this.show = false
      this.$emit('accepted')
    },
  },
};
</script>
