<template>
  <div @drop.stop="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { TransferData } from '@/features/moveTasksOrColumns'
import { defineEmits } from 'vue'

const emits = defineEmits(['drop'])
function onDrop(e: DragEvent) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer) {
    const data = JSON.parse(dataTransfer.getData('payload')) as TransferData
    emits('drop', data)
  }
}
</script>
<style></style>
