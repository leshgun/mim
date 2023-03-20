<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Header from '@/components/Header.vue';
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
  
  <Header>
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="classic">Classic</RouterLink>
    <RouterLink to="infinity">Infinity</RouterLink>
  </Header>
  <div id="wrapper"><RouterView /></div>
  

</template>





<style lang="scss" scoped>

  Header {
    --header-height: 50px;
    --header-font-size: 16px;
  }

  #wrapper {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    flex-grow: 1;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

</style>
