import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Introduction",
    component: () => import(/* webpackChunkName: "Introduction" */ "../views/Introduction.vue"),
  },
  {
    path: "/:id",
    name: "LayerGroup",
    component: () => import(/* webpackChunkName: "LayerGroup" */ "../views/LayerGroup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
