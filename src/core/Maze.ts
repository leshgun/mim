import MyRandom from '@/utils/random'
import Cell from '@/core/Cell'
import { CELLTYPE } from '@/core/Cell'
import Item from '@/core/Item';
import { ITEMID } from '@/core/Item'
import Character from '@/core/Character'



type TMaze = Cell[][];
type TMap = number[][];
type TModificators = {
  "Smoke"?: number
}
type CellCoords = {x: number, y: number};

interface IMaze {
  rows:   number;
  columns: number;
  modificators?: TModificators;
  
  generate(): Promise<void>;
  getCharacterCoords(): CellCoords;
  getMap(): number[][];
  initMaze(): void;
  characterMove(coords:CellCoords): void;
};



class Maze implements IMaze {

  rows: number = 5;
  columns: number = 5;
  modificators: TModificators = {};
  maze: TMaze = [];
  
  private mrandom: MyRandom;
  private character: Character;

  public maze_completed: boolean = false;


  constructor (rows: number, columns: number, modificators?: TModificators) {
    this.rows = rows || this.rows;
    this.columns = columns || this.columns;
    this.mrandom = new MyRandom();
    this.character = new Character({
      id: 100,
      coords: { x: 0, y: 0 }
    });
    this.modificators = modificators || this.modificators;
  }

  private addModificators (cell:Cell, mods:TModificators):void {
    Object.keys(mods).forEach(mod => {
      if (mod === "Smoke")
        cell.addItem(new Item({
          id: ITEMID.Smoke
        }))
    })
  }

  private characterCanMove (coords:CellCoords):boolean {
    if (!this.isInMaze(coords))
      return false;
    const target_cell = this.getCellByCoords(coords);
    if (target_cell.cellType === CELLTYPE.WALL)
      return false;
    return true;
  }

  private async characterInit ():Promise<void> {
    const new_cell = this.getFreeCell();
    this.character.coords = new_cell.coords;
    new_cell.addItem(this.character);
  }

  public characterMove (coords:CellCoords):void {
    const new_coords = this.sumCoords (this.character.coords, coords);
    if (this.characterCanMove(new_coords)) {
      const prev_cell = this.getCellByCoords(this.character.coords);
      prev_cell.deleteItem(this.character);
      prev_cell.cellType = CELLTYPE.VISITED;
      // this.getCellByCoords(this.character.coords).deleteItem(this.character);
      this.character.move(coords);
      const new_cell = this.getCellByCoords(new_coords);
      new_cell.addItem(this.character);
      this.smokeDeleteAround(new_cell);
      this.checkMazeComplete();
    }
  }

  private checkMazeComplete ():void {
    if (this.getCellByCoords(this.character.coords).items.some(x => x.id === 102)) {
      this.maze_completed = true;
      console.log('======= Completed! =======');
    }
  }

  private depthFirst (current_cell:Cell, prev_cell?:Cell):void {

    // if visited => return(null)
    if (current_cell.cellType === CELLTYPE.VISITED)
      return;

    // mark as empty
    current_cell.cellType = CELLTYPE.EMPTY;

    const neighbours = this.getNeighbours(current_cell);

    // if empty_neighbours > 1 => wall => return(back)
    const emppty_neighbours = this.filterNeighbours(neighbours, CELLTYPE.EMPTY);
    if (emppty_neighbours.length > 1) {
      current_cell.cellType = CELLTYPE.WALL;
      if (prev_cell) return this.depthFirst(prev_cell);
    }

    // if unknown_neighbours === 0 => visited => return(back)
    const unknown_neighbours = this.filterNeighbours(neighbours, CELLTYPE.UNKNOWN);
    if (!unknown_neighbours.length) {
      current_cell.cellType = CELLTYPE.VISITED;
      if (prev_cell)
        return this.depthFirst(prev_cell);
      if (emppty_neighbours.length)
        return this.depthFirst(emppty_neighbours[0]);
      return;
    }

    const rand_ind = this.mrandom.randomInterval(0, unknown_neighbours.length - 1);
    const rand_cell = unknown_neighbours[rand_ind];
    return this.depthFirst(rand_cell, current_cell);
  }
  
  private filterNeighbours (neighbours:Cell[], neighbour_type:CELLTYPE):Cell[] {
    return neighbours.filter(
      cell => cell.cellType === neighbour_type
      );
  }

  private async finishInit ():Promise<void> {
    this.getFreeCell().addItem(new Item({id: 102}));
  }

  public async generate (start_cell?:CellCoords):Promise<void> {
    this.initMaze()
    if (!start_cell)
      start_cell = {
        x: this.mrandom.randomInterval(0, this.columns - 1),
        y: this.mrandom.randomInterval(0, this.rows - 1)
      }
    this.depthFirst(this.getCellByCoords(start_cell));
    this.generated();
  }

  private generated ():void {
    this.maze.forEach(row => {
      row.forEach(cell => {
        if (cell.cellType === CELLTYPE.UNKNOWN)
          cell.cellType = CELLTYPE.WALL;
        else if (cell.cellType === CELLTYPE.VISITED)
          cell.cellType = CELLTYPE.EMPTY;
      });
    });
    this.characterInit();
    this.finishInit();
    this.modificatorsInit();
  }

  private getCellByCoords (coords:CellCoords):Cell {
    return this.maze[coords.y][coords.x];
  }

  public getCharacterCoords ():CellCoords {
    return this.character.coords;
  }

  private getFreeCell ():Cell {
    const free_cells = this.getFreeCells();
    return free_cells[
      this.mrandom.randomInterval(0, free_cells.length - 1)
    ];
  }

  private getFreeCells ():Cell[] {
    return this.maze.reduce((row, acc) => 
      acc.concat(row.filter(cell => cell.cellType === CELLTYPE.EMPTY)),
      []
    );
  }

  public getMap ():number[][] {
    // init new map
    let maze : TMap = [];

    // get map of the maze
    this.maze.forEach(row => {
      maze.push(row.map(cell => {
        // place items on the map
        if (cell.getItems(100).length)
          return this.character.id;
        // if smoke return smoke
        if (cell.getItems(101).length) {
          return 101
        }
        // return item on the top of the stack
        if (cell.items.length)
          return cell.items[cell.items.length-1].id;
        // return cell
        return cell.cellType;
      }));
    });


    return maze;
  }

  private getNeighbours (cell:Cell, all:boolean = false):Cell[] {
    let neighbours : Cell[] = [];
    const coords = cell.coords;
    for (let i = -1; i < 2; ++i) {
      for (let j = -1; j < 2; ++j) {
        const new_coords = { x: coords.x + i, y: coords.y + j }
        if (!this.isInMaze(new_coords))
          continue;
        if (!all && (Math.abs(i) + Math.abs(j) > 1))
          continue;
        if (!(i || j))
          continue;
        neighbours.push(
          this.getCellByCoords(new_coords)
        );
      }
    }
    return neighbours;
  }

  public initMaze ():void {
    let maze : TMaze = [];
    for (let i = 0; i < this.rows; ++i) {
      let row : Cell[] = []
      for (let j = 0; j < this.columns; ++j) {
        const new_cell = new Cell({
          coords: {x: j, y: i},
        });
        if (Object.keys(this.modificators).length)
          this.addModificators(new_cell, this.modificators);
        row.push(new_cell);
      }
      maze.push(row);
      // maze.push(new Array(this.columns).fill(0).map((_, j) => new Cell({
      //   coords: {x: j, y: i},
      //   cellType: CELLTYPE.UNKNOWN
      // })))
    }
    this.maze = maze;
  }

  private isInMaze (coords:CellCoords):boolean {
    if (coords.x < 0 || coords.x >= this.columns)
      return false;
    if (coords.y < 0 || coords.y >= this.rows)
      return false;
    return true;
  }

  private modificatorsInit (): void {
    if (this.modificators["Smoke"]) {
      // Remove smokes
      this.getNeighbours(this.getCellByCoords(this.character.coords), true)
        .forEach(neighbour => neighbour.deleteItem(
          neighbour.items.filter(item => item.id === ITEMID.Smoke)[0]
        ));
    }
  }

  private async smokeDeleteAround (cell:Cell):Promise<void> {
    if (this.modificators["Smoke"]) {
      // Remove smokes
      this.getNeighbours(cell, true).forEach(neighbour => {
        const _s = neighbour.getItems(ITEMID.Smoke);
        if (_s.length) neighbour.deleteItem(_s[0]);
      });
    }
  }

  private sumCoords (coord1:CellCoords, coord2:CellCoords):CellCoords {
    let [x, y] = [coord1.x + coord2.x, coord1.y + coord2.y];
    return { x: x, y: y };
  }

}

export default Maze;
