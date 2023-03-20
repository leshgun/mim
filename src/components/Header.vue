<script lang="ts">
  export default {

  }
</script>



<template>
  <header>
    <slot></slot>
  </header>
</template>



<style lang="scss" scoped>
  * {
    --header-background: #044;
    --header-height: 100px;
    --header-font-size: 16px;
    --header-font-weight: 800;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  header {
    height: var(--header-height);
    background: var(--header-background);
    font-size: var(--header-font-size);
    font-weight: var(--header-font-weight);
  }
</style>
