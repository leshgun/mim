<script lang="ts" setup>
  import { useMazeStore } from '@/stores/maze'
  import Maze from '@/utils/Maze'
  import Grid from '@/components/Grid.vue';
  import Character from './Character.vue';
</script>



<script lang="ts">
  export default {

    data() {
      let store = useMazeStore()
      return {
        store: useMazeStore(),
        maze: new Maze(store.rows, store.columns),
        mazeMap: <Number[][]> []
      }
    },

    mounted() {
      this.store.generateMap = () => this.generateMap();
      this.generateMap();
    },

    methods: {
      async generateMap() {
        await this.maze.generateMaze();
        this.mazeMap = this.maze.getMap();
      }
    },

    // watch: {
    //   maze: {
    //     handler() {
    //       this.mazeMap = this.maze.getMap();
    //     },
    //     deep: true
    //   }
    // }
  }
</script>



<template>
  <div id="maze" >
    <Grid :grid-map="mazeMap" :cell-size="store.cellSize" />
    <!-- <Character :size="store.cellSize" :color="'red'" /> -->
  </div>
</template>



<style>

  * {

    --maze-background: var(--color-grey);
    --maze-grid-color: var(--color-black);
    --maze-grid-size: 1px;

    --cell-unknown-background: var(--color-grey-2);
    --cell-wall-background: var(--color-grey-3);
    --cell-empty-background: var(--color-grey);
    --cell-visited-background: var(--color-blue);
    --cell-border: 1px solid var(--color-black);
  }

  #maze {
    display: fixed;
    width: 100%;
    min-height: 100%;
    user-select: none;
  }

  .cell-type_0 {
    background: var(--cell-unknown-background) !important;
  }

  .cell-type_1 {
    background: var(--cell-empty-background) !important;
  }

  .cell-type_2 {
    background: var(--cell-wall-background) !important;
  }

  .cell-type_3 {
    background: var(--cell-visited-background) !important;
  }

</style>
