<script lang="ts" setup>
import { BoardState, TaskDescriptor } from '@/store'
import { defineProps } from 'vue'
import { useStore, Store } from 'vuex'
import { useRouter } from 'vue-router'
import { moveItem, TransferData } from '@/features/moveTasksOrColumns'
import BaseDrop from './base/BaseDrop.vue'
import BaseDrag from './base/BaseDrag.vue'

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

function onDrop(transferData: TransferData) {
  moveItem(transferData, props.columnIndex, props.taskIndex)
}
</script>
<template>
  <BaseDrop @drop="onDrop">
    <BaseDrag
      :transferData="{
        dragType: 'task',
        columnIndex: columnIndex,
        taskIndex: taskIndex,
      }"
    >
      <v-card class="task-card" @click="goToTask(task.id)">
        <v-card-title>{{ task.name }}</v-card-title>
        <v-card-text>{{ task.description }}</v-card-text>
        <v-divider></v-divider>
      </v-card>
    </BaseDrag>
  </BaseDrop>
</template>
<style></style>
