<script lang="ts" setup>
import { BoardState, TaskDescriptor } from '@/store'
import { defineProps } from 'vue'
import { useStore, Store } from 'vuex'
import { useRouter } from 'vue-router'

export interface BoardTaskProps {
  task: TaskDescriptor
  taskIndex: number
  columnIndex: number
}

const store = useStore() as Store<BoardState>
const router = useRouter()
const props = defineProps<BoardTaskProps>()

function goToTask(taskId: number) {
  router.push({ name: 'task', params: { id: taskId } })
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
</script>
<template>
  <div
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveItem($event, columnIndex, taskIndex)"
    style="z-index: 1; transform: translate(0, 0)"
  >
    <v-card class="task-card" @click="goToTask(task.id)">
      <v-card-title>{{ task.name }}</v-card-title>
      <v-card-text>{{ task.description }}</v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>
<style></style>
