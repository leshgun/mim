import { defineStore } from 'pinia'



// function generateMap(row_num: number, column_num: number): Array<Array<number>> {
//   let map: Array<Array<number>> = [];

//   for (let x = 0; x < row_num; x++) {
//     const row = []
//     for (let y = 0; y < column_num; y++) {
//       row.push(Math.round(Math.random()));
//     }
//     map.push(row);
//   }

//   return map;
// }

export const useMazeStore = defineStore('maze', () => {

  const cellSize: number = 20;
  const character_steps: number = 0;
  const columns: number = 30;
  const modificators = {};
  const rows: number = 30;
  const game_timer: string = '';

  const generateMap = () =>
    console.log("The map function has not been initialized...")

  return { cellSize, rows, columns, generateMap, character_steps, game_timer }
})
