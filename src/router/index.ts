import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BoardView from "../views/BoardView.vue";
import TaskView from "../views/TaskView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "board",
    component: BoardView,
    children: [
      {
        path: "task/:id",
        name: "task",
        component: TaskView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
