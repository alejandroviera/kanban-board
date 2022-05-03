import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BoardView from "../views/BoardView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Board",
    component: BoardView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
