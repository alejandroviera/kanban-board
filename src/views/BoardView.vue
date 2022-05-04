<script lang="ts" setup>
import { useStore, Store } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { BoardState } from "@/store/index";

const store = useStore() as Store<BoardState>;
const router = useRouter();

const isTaskOpen = computed(() => useRoute().name === "task");

function goToTask(taskId: number) {
  router.push({ name: "task", params: { id: taskId } });
}

function close() {
  router.push({ name: "board" });
}
</script>

<template>
  <div class="board">
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(column, $columnIndex) of store.state.board.columns"
          :key="$columnIndex"
        >
          <v-card class="column-card" color="blue-grey-lighten-4">
            <v-card-title>{{ column.name }}</v-card-title>
            <v-divider></v-divider>
            <v-card
              v-for="(task, $taskIndex) of column.tasks"
              :key="$taskIndex"
              class="task-card"
              @click="goToTask(task.id)"
            >
              <v-card-title>{{ task.name }}</v-card-title>
              <v-card-text>{{ task.description }}</v-card-text>
              <v-divider></v-divider>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div class="task-bg" v-if="isTaskOpen" @click.self="close">
    <router-view />
  </div>
</template>

<style>
.board {
  background-color: #319795;
  padding: 1rem;
  overflow: auto;
  height: 100%;
}

.column-container {
  display: flex;
  flex-direction: row;
  justify-items: flex-start;
}

.column {
  background-color: #edf2f7;
  padding: 0.5rem;
  margin-right: 1rem;
  text-align: left;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.25rem;
}
/*
.tasks-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
}*/

.column-card {
  padding-bottom: 10pt;
}

.task-card {
  margin: 15pt;
}
/*.task {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #ffffff;
  text-decoration: none;
  color: #2d3748;
}*/

.task-bg {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
