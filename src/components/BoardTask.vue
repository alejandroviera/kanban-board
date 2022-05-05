<script lang="ts" setup>
import { BoardState, TaskDescriptor } from '@/store'
import { defineProps } from 'vue'
import { useStore, Store } from 'vuex'
import { useRouter } from 'vue-router'
import { moveItem } from '@/features/moveTasksOrColumns'

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
