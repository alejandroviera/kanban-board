<script lang="ts" setup>
import { useStore, Store } from 'vuex'
import { defineProps, ref } from 'vue'
import { BoardState, ColumnDescriptor } from '@/store/index'
import BoardTask from '@/components/BoardTask.vue'
import { moveItem, TransferData } from '@/features/moveTasksOrColumns'
import BaseDrop from './base/BaseDrop.vue'

export interface BoardColumnProps {
  column: ColumnDescriptor
  columnIndex: number
}

const store = useStore() as Store<BoardState>
const props = defineProps<BoardColumnProps>()
const newTaskName = ref('')

function createTask() {
  store.commit('CREATE_TASK', {
    tasks: props.column.tasks,
    name: newTaskName.value,
  })
  newTaskName.value = ''
}

function onDrop(transferData: TransferData) {
  moveItem(transferData, props.columnIndex, -1)
}
</script>
<template>
  <v-col>
    <BaseDrop @drop="onDrop">
      <BaseDrag
        :transferData="{ dragType: 'column', columnIndex: columnIndex }"
      >
        <v-card class="column-card" color="blue-grey-lighten-4">
          <v-card-title>{{ column.name }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <BoardTask
              v-for="(task, $taskIndex) of column.tasks"
              :key="$taskIndex"
              :task="task"
              :taskIndex="$taskIndex"
              :columnIndex="columnIndex"
            />
          </v-card-text>
          <v-card-actions>
            <v-text-field
              label="+ Enter new task"
              variant="outlined"
              color="success"
              class="bg-transparent mx-4"
              v-model="newTaskName"
              @keyup.enter="createTask()"
            ></v-text-field>
          </v-card-actions>
        </v-card>
      </BaseDrag>
    </BaseDrop>
  </v-col>
</template>
<style>
.column-card {
  padding-bottom: 10pt;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.25rem;
}

.task-card {
  margin: 15pt;
}
</style>
