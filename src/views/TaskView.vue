<template>
  <v-card class="task-view">
    <v-card-title>
      <v-text-field
        class="task-name-field"
        v-model="task.name"
        variant="plain"
        @change="updateTaskProperty($event, 'name')"
        @keyup.esc="close"
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-textarea
        label="Description"
        v-model="task.description"
        variant="plain"
        @change="updateTaskProperty($event, 'description')"
        @keyup.esc="close"
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { TaskDescriptor } from '@/store/index'

export interface TaskViewProps {
  task: TaskDescriptor
}

const store = useStore()
const route = useRoute()
const router = useRouter()

const task = store.getters.getTask(
  parseInt(route.params.id.toString())
) as TaskDescriptor

function updateTaskProperty(event: any, propertyKey: string) {
  store.commit('UPDATE_TASK', {
    task,
    key: propertyKey,
    value: event.target.value,
  })
}

function close() {
  router.push({ name: 'board' })
}
</script>

<style>
.task-name-field input {
  font-size: 1.5em;
  font-weight: bold;
}

.task-view {
  position: relative;
  background-color: white;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: 8rem;
  margin-right: auto;
  margin-left: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: left;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  max-width: 700px;
}
</style>
