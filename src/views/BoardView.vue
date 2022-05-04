<script lang="ts" setup>
import { useStore, Store } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { BoardState, ColumnDescriptor, TaskDescriptor } from '@/store/index'

const store = useStore() as Store<BoardState>
const router = useRouter()

const isTaskOpen = computed(() => useRoute().name === 'task')
let newTaskName = ref('')

function goToTask(taskId: number) {
  router.push({ name: 'task', params: { id: taskId } })
}

function close() {
  router.push({ name: 'board' })
}

function createTask(e: KeyboardEvent, tasks: TaskDescriptor[]) {
  store.commit('CREATE_TASK', {
    tasks: tasks,
    name: newTaskName.value,
  })
  newTaskName.value = ''
}

function pickupTask(e: DragEvent, taskIndex: number, columnIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer !== null) {
    dataTransfer.effectAllowed = 'move'
    dataTransfer.dropEffect = 'move'
    dataTransfer.setData('task-index', taskIndex.toString())
    dataTransfer.setData('column-index', columnIndex.toString())
    dataTransfer.setData('drag-type', 'task')
  }
}

function moveItem(e: DragEvent, columnIndex: number, taskIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const dragType = dataTransfer.getData('drag-type')
    if (dragType === 'task') {
      if (taskIndex == -1) {
        taskIndex = store.state.board.columns[columnIndex].tasks.length
      }
      moveTask(e, columnIndex, taskIndex)
    } else if (dragType === 'column') {
      moveColumn(e, columnIndex)
    }
  }
}

function moveTask(e: DragEvent, columnIndex: number, taskIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const fromColumnIndex = parseInt(dataTransfer.getData('column-index'))
    const fromTaskIndex = parseInt(dataTransfer.getData('task-index'))
    store.commit('MOVE_TASK', {
      fromColumn: store.state.board.columns[fromColumnIndex],
      fromTaskIndex: fromTaskIndex,
      toColumn: store.state.board.columns[columnIndex],
      toTaskIndex: taskIndex,
    })
  }
}

function moveColumn(e: DragEvent, columnIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer != null) {
    const fromColumnIndex = parseInt(dataTransfer.getData('column-index'))
    store.commit('MOVE_COLUMN', {
      fromColumnIndex: fromColumnIndex,
      toColumnIndex: columnIndex,
    })
  }
}

function pickupColumn(e: DragEvent, columnIndex: number) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer !== null) {
    dataTransfer.effectAllowed = 'move'
    dataTransfer.dropEffect = 'move'
    dataTransfer.setData('column-index', columnIndex.toString())
    dataTransfer.setData('drag-type', 'column')
  }
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
          <v-card
            class="column-card"
            color="blue-grey-lighten-4"
            @drop="moveItem($event, $columnIndex, -1)"
            @dragover.prevent
            @dragenter.prevent
            draggable="true"
            @dragstart.self="pickupColumn($event, $columnIndex)"
          >
            <v-card-title>{{ column.name }}</v-card-title>
            <v-divider></v-divider>
            <div
              v-for="(task, $taskIndex) of column.tasks"
              :key="$taskIndex"
              draggable="true"
              @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
              @dragover.prevent
              @dragenter.prevent
              @drop.stop="moveItem($event, $columnIndex, $taskIndex)"
              style="z-index: 1; transform: translate(0, 0)"
            >
              <v-card class="task-card" @click="goToTask(task.id)">
                <v-card-title>{{ task.name }}</v-card-title>
                <v-card-text>{{ task.description }}</v-card-text>
                <v-divider></v-divider>
              </v-card>
            </div>
            <v-text-field
              label="+ Enter new task"
              variant="outlined"
              color="success"
              class="bg-transparent mx-4"
              v-model="newTaskName"
              @keyup.enter="createTask($event, column.tasks)"
            ></v-text-field>
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
