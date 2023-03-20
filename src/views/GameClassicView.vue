<script lang="ts" setup>

  import Maze from "@/components/Maze.vue"
  import InfoPanel from "@/components/InfoPanel.vue"

  // import { mapStores } from "pinia";
  import { useMazeStore } from "@/stores/maze";
import { ref } from "vue";

</script>

<script lang="ts">
  export default {
    // computed: {
    //   ...mapStores(useMazeStore)
    // },
    data() {
      const store = useMazeStore()
      return {
        store: store,
        infoItems: [
          {"row": ["Steps", 5]},
          {"row": ["Loh?", "Net"]},
          {"button": {
            "class": "button-2", 
            "value": "Refresh",
            "trigger": () => {store.generateMap()}
          }}
        ]
      }
    },
  }
</script>



<template>

  <main>
    <Maze />
    <InfoPanel id="panel-1" :items="infoItems"></InfoPanel>
  </main>

</template>





<style scoped>

  main {
    width: 100%;
    display: flex;
    padding: 2rem;
  }

  #panel-1 {
    margin-top: 6rem;
    margin-left: 2rem;
  }
  
</style>
