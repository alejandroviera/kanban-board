<script lang="ts" setup>
import { useStore, Store } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { BoardState } from '@/store/index'
import BoardColumn from '../components/BoardColumn.vue'

const store = useStore() as Store<BoardState>
const router = useRouter()

const isTaskOpen = computed(() => useRoute().name === 'task')
const newColumnName = ref('')

function close() {
  router.push({ name: 'board' })
}

function createColumn() {
  store.commit('CREATE_COLUMN', newColumnName.value)
  newColumnName.value = ''
}
</script>

<template>
  <div class="board">
    <v-container fluid>
      <v-row dense>
        <BoardColumn
          v-for="(column, $columnIndex) of store.state.board.columns"
          :key="$columnIndex"
          :column="column"
          :columnIndex="$columnIndex"
        />
        <v-col>
          <v-card class="column-card" color="blue-grey-lighten-4">
            <v-card-text>
              <v-text-field
                label="New Column"
                variant="outlined"
                color="success"
                class="bg-transparent mx-4"
                v-model="newColumnName"
                @keyup.enter="createColumn"
              ></v-text-field>
            </v-card-text>
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

.column-card {
  padding-bottom: 10pt;
}

.task-bg {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
</style>
