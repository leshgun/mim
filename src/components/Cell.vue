<script lang="ts">
import type { PropType } from 'vue';


  export default {

    props: {
      cellType: Object as PropType<Number>,
      cellSize: Number
    },
    data() {
      return {
        cellStyle: {
          width: `${this.cellSize}px`,
          height: `${this.cellSize}px`
        }
      }
    }

  }

</script>

<template>

  <div 
    :class = "['cell', `cell-type_${cellType}`]" 
    :style = "cellStyle"
    >
  </div>

</template>

<style scoped>

  * {
    --color-grey: #C3C3C3;
    --color-dark-grey: #6C6C6C;

    --cell-background: var(--color-grey);
    --cell-wall-background: var(--color-dark-grey);
    --cell-border: 1px solid rgba(0, 0, 0, .1);
  }

  .cell {
    background: var(--cell-background);
    border: var(--cell-border);
    user-select: none;
  }

  .cell-type_1 {
    background: var(--cell-wall-background);
  }

</style>
