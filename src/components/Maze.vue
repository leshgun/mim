<script lang="ts" setup>
  import { useMazeStore } from '@/stores/maze'
  import Maze from '@/core/Maze'
  import Timer from '@/core/Timer'
  import Grid from '@/components/Grid.vue';
</script>



<script lang="ts">

  enum KEYCODES {
    Left = 37,
    Up = 38,
    Right = 39,
    Down = 40,
  }

  const maze_mods = {
    'Smoke': 2
  }

  export default {

    data() {
      const store = useMazeStore();
      return {
        store: useMazeStore(),
        maze: new Maze(store.rows, store.columns, maze_mods),
        timer: new Timer(),
        mazeMap: <Number[][]> []
      }
    },

    mounted() {
      window.addEventListener('keydown', this.keyListener);
      console.log('Add event listener!');
      this.store.generateMap = () => this.generateMap();
      this.generateMap();
      // setTimeout(() => {this.timer.reset()}, 10000)
    },

    unmounted() {
      window.removeEventListener('keydown', this.keyListener);
      console.log('remove event listener')
    },

    methods: {
      clearInfo() {
        this.timer.reset();
        this.store.character_steps = 0;
      },
      async updateMap() {
        this.mazeMap = this.maze.getMap();
      },
      async generateMap() {
        await this.maze.generate();
        this.clearInfo();
        this.updateMap();
      },
      async characterMove(dir:KEYCODES) {
        let [x, y] = [0, 0];
        switch (dir) {
          case KEYCODES.Up:    y = -1; break;
          case KEYCODES.Down:  y =  1; break;
          case KEYCODES.Left:  x = -1; break;
          case KEYCODES.Right: x =  1; break;
        }
        if (x || y) {
          this.maze.characterMove({ x: x, y: y });
          this.updateMap();
          this.store.character_steps += 1;
        }
      },
      keyListener(event:any) {
        event.preventDefault();
        if (event.key.includes("Arrow"))
          this.characterMove(event.keyCode);
      },
    },

    watch: {
      timer: {
        handler() {
          this.store.game_timer = this.timer.getTime();
        },
        deep: true
      }
    }
  }
</script>



<template>
  <div id="maze" tabindex="0">
    <Grid :grid-map="mazeMap" :cell-size="store.cellSize" />
  </div>
</template>



<style>

  * {

    --maze-background: var(--color-grey);
    --maze-grid-color: var(--color-black);
    --maze-grid-size: 1px;

    --cell-border: 1px solid var(--color-black);
    --cell-character-background: red;
    --cell-empty-background: var(--color-grey);
    --cell-finish-background: green;
    --cell-smoke-background: rgba(100, 100, 6);
    --cell-unknown-background: var(--color-grey-2);
    --cell-visited-background: var(--color-blue);
    --cell-wall-background: var(--color-grey-3);
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

  .cell-type_4 {
    background: var(--cell-character-background) !important;
  }

  .cell-type_100 {
    background: var(--cell-character-background) !important;
  }

  .cell-type_101 {
    background: var(--cell-smoke-background) !important;
  }

  .cell-type_102 {
    background: var(--cell-finish-background) !important;
  }

</style>
