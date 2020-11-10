<template>
  <v-navigation-drawer clipped app permanent width="400">
    <router-view v-on="$listeners" /> 
  </v-navigation-drawer>
</template>
