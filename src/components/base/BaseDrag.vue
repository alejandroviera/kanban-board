<template>
  <div
    @dragstart.self="onDrag"
    draggable="true"
    @dragover.prevent
    @dragenter.prevent
    style="z-index: 1; transform: translate(0, 0)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { TransferData } from '@/features/moveTasksOrColumns'
import { defineProps } from 'vue'

export interface BaseDragProps {
  transferData: TransferData
}

const props = defineProps<BaseDragProps>()

function onDrag(e: DragEvent) {
  const dataTransfer = e.dataTransfer
  if (dataTransfer) {
    dataTransfer.effectAllowed = 'move'
    dataTransfer.dropEffect = 'move'
    dataTransfer.setData('payload', JSON.stringify(props.transferData))
  }
}
</script>
<style></style>
