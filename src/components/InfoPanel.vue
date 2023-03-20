<script lang="ts" setup>
  
</script>


<script lang="ts">
  export default {
    props: {
      items: {
        type: Array<any>,
        defaut: []
      }
    }
  }
</script>



<template> 
  <div class="info-panel">
    <div class="item" v-for="item in items">
      <button 
        v-if="item.button" 
        :class="item.button.class" 
        role="button"
        @click="item.button.trigger()"
        >
          {{ item.button.value }}
      </button>
      <div v-if="item.row" class="item_name">{{ item.row[0] }}</div>
      <div v-if="item.row" class="item_value">{{ item.row[1] }}</div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
  * {
    --panel-background: var(--color-grey-3);
    --button-background: var(--color-grey-2);
    --button-color: var(--color-grey-1);
  }
  button {
    width: 100%;
    max-width: 200px;
    user-select: none;
    -webkit-user-select: none;
    background: var(--button-background);
    color: var(--button-color);
  }
  .info-panel {
    background: var(--panel-background);
    height: fit-content;
    width: 300px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 1rem;
  }
  .item {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .button-1 {
    align-items: center;
    border: 2px solid #000;
    cursor: pointer;
    /* font-family: Inter,sans-serif; */
    /* font-size: 16px; */
    font-weight: 600;
    /* height: 48px; */
    justify-content: center;
    letter-spacing: -.8px;
    line-height: 1.2rem;
    /* min-width: 140px; */
    outline: 0;
    padding: 0 1rem;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
      border-color: var(--color-blue-2);
      color: var(--color-blue-2);
      fill: var(--color-blue-2);
    }
    &:active {
      border-color: var(--color-blue-2);
      color: var(--color-blue-2);
      fill: var(--color-blue-2);
    }
  }
  .button-2 {
    background: #FF4742;
    border: 1px solid #FF4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
    // font-size: 16px;
    font-weight: 800;
    // line-height: 16px;
    // min-height: 40px;
    outline: 0;
    padding: .1rem 0;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    &:hover, &:active {
      background-color: initial;
      background-position: 0 0;
      color: #FF4742;
    }
    &:active {
      opacity: .5;
    }
  }
</style>
