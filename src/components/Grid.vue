<script lang="ts">

  export default {
    props: {
      cellSize: {
        type: Number,
        default: 25
      },
      gridMap: {
        type: Array<Array<Number>>,
        default: [[0, 0]]
      }
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
  <ul class="grid">
    <li class="grid_row" v-for="row in gridMap">
      <div
        v-for="cell in row"
        :class="['grid_cell', `cell-type_${cell}`]"
        :style="cellStyle"
        >
        <div style="text-align: center; color: brown;">
          <!-- {{ cell }} -->
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>

  * {
    --color-grey: #C3C3C3;
    --color-dark-grey: #6C6C6C;

    --cell-background: var(--color-grey);
    --cell-border: 1px solid rgba(0, 0, 0, .1);
  }

  .grid {
    /* display: inline-flex; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .grid_cell {
    background: var(--cell-background);
    border: var(--cell-border);
    user-select: none;
  }

  .grid_row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

</style>
