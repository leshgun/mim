<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { mapStores } from "pinia";
  import { useMazeStore } from './stores/maze';
</script>

<script lang="ts">
  export default {
    computed: {
      // ...mapStores(useMazeStore)
    }
  }
</script>



<template>
  
  <div class="wrapper">
    <RouterView />
  </div>

</template>





<style scoped>

  .wrapper {
    min-height: 100vh;
    width: 100%;
    max-width: 900px;
    
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

</style>
