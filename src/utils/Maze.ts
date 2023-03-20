import MyRandom from '@/utils/random'
import Cell, {CELLTYPE} from '@/utils/Cell'
import Character from '@/utils/Character'
// import type {TCell} from '@/utils/Cell'

interface IMaze {
  rows:   number,
  columns: number,
  generateMaze(): Promise<void>,
  getMap(): number[][],
  initMaze(): void,
};

type TMaze = Cell[][];
type TMap = number[][];

type CellCoords = {x: number, y: number};



class Maze implements IMaze {

  rows: number = 5;
  columns: number = 5;
  maze: TMaze = [];
  
  private mrandom: MyRandom;
  private character: Character;


  constructor (rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.mrandom = new MyRandom();
    this.character = new Character();
  }

  private depthFirst (current_cell:Cell, prev_cell?:Cell):void {

    // if visited => return(null)
    if (current_cell.cellType === CELLTYPE.VISITED)
      return;

    // mark as empty
    current_cell.setCellType(CELLTYPE.EMPTY);

    const neighbours = this.getNeighbours(current_cell);

    // if empty_neighbours > 1 => wall => return(back)
    const emppty_neighbours = this.filterNeighbours(neighbours, CELLTYPE.EMPTY);
    if (emppty_neighbours.length > 1) {
      current_cell.setCellType(CELLTYPE.WALL);
      if (prev_cell) return this.depthFirst(prev_cell);
    }

    // if unknown_neighbours === 0 => visited => return(back)
    const unknown_neighbours = this.filterNeighbours(neighbours, CELLTYPE.UNKNOWN);
    if (!unknown_neighbours.length) {
      current_cell.setCellType(CELLTYPE.VISITED)
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

  public async generateMaze (start_cell?:CellCoords):Promise<void> {
    this.initMaze()
    if (!start_cell)
      start_cell = {
        x: this.mrandom.randomInterval(0, this.rows - 1),
        y: this.mrandom.randomInterval(0, this.columns - 1)
      }
    this.depthFirst(this.getCellByCoords(start_cell));
    this.initCharacter();
  }

  private getCellByCoords (coords:CellCoords):Cell {
    return this.maze[coords.y][coords.x];
  }

  public getMap ():number[][] {
    let maze : TMap = [];
    this.maze.forEach(row => {
      maze.push(row.map(cell => {
        const cellType = cell.getCellValue();
        if (cellType === CELLTYPE.UNKNOWN)
          return CELLTYPE.WALL;
        if (cellType === CELLTYPE.VISITED)
          return CELLTYPE.EMPTY;
        return cellType;
      }));
    });
    return maze;
  }

  private getNeighbours (cell:Cell, all?:false):Cell[] {
    let neighbours : Cell[] = [];
    const coords = cell.coords;
    for (let i = -1; i < 2; ++i) {
      for (let j = -1; j < 2; ++j) {
        if ((coords.x + i >= this.columns) || (coords.x + i < 0)) continue;
        if ((coords.y + j >= this.rows) || (coords.y + j < 0)) continue;
        if (!all && (Math.abs(i) + Math.abs(j) > 1)) continue;
        if (!(i || j)) continue;
        neighbours.push(this.getCellByCoords({
          x: coords.x + i, 
          y: coords.y + j
          }));
      }
    }
    return neighbours;
  }

  public initMaze ():void {
    let maze : TMaze = [];
    for (let i = 0; i < this.rows; ++i) {
      maze.push(new Array(this.columns).fill(0).map((_, j) => new Cell({
        coords: {x: j, y: i},
        cellType: CELLTYPE.UNKNOWN
      })))
    }
    this.maze = maze;
  }

  private placeCharacter (character:Character, position:CellCoords):void {
    if (this.maze[position.y][position.x].cellType === CELLTYPE.EMPTY) {
      this.maze[position.y][position.x] = character;
      this.character.coords = position;
    }
  }

  private initCharacter ():void {
    const free_cells:Cell[] = [];
    this.maze.forEach(row => {
      row.forEach(cell => {
        if (cell.cellType === CELLTYPE.VISITED)
          cell.cellType = CELLTYPE.EMPTY;
        if (cell.cellType === CELLTYPE.EMPTY)
          free_cells.push(cell);
      });
    });

    const position = free_cells[
      this.mrandom.randomInterval(0, free_cells.length - 1)
    ].coords;

    this.placeCharacter(this.character, position);
  }

}

export default Maze;
