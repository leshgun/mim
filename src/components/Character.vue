<script lang="ts" setup></script>

<script lang="ts">

  interface ICharacter {
    position: { x:number, y:number }
  }

  class Character implements ICharacter {

    position: { x: number, y: number };

    constructor (props:ICharacter) {
      this.position = props.position;
    }

  }

  export default {
    props: {
      size: Number,
      style: {
        type: String,
        default: "triangle"
      },
      color: {
        type: String,
        default: "red"
      }
    },
    data() {
      const character_props = {
        position: { x: 0, y: 0 }
      }
      return {
        character: new Character(character_props),
        characterAreaStyle: {
          width: `${this.size}px`,
          height: `${this.size}px`,
          background: this.color
        }
      }
    }
  }

</script>



<template>
  <div class="character-area" :style="characterAreaStyle">
    <span class="character"></span>
  </div>
</template>



<style scoped>
  .character-area {
    display: flex;
    place-items: center;
    width: 30px;
    height: 30px;
    position: absolute;
    z-index: 100;
    top: 0;
  }
</style>
