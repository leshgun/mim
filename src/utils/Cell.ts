export enum CELLTYPE {
  UNKNOWN,
  EMPTY,
  WALL,
  VISITED,
  CHARACTER
}

export type TCell = {
  x : number,
  y : number
}

export interface ICell {
  cellType?: CELLTYPE,
  coords?: TCell
};

class Cell implements ICell {
  
  cellType: CELLTYPE = CELLTYPE.UNKNOWN;
  coords: TCell = { x: 0, y: 0 };

  constructor (props?: ICell) {
    if (props) {
      this.cellType = props.cellType || CELLTYPE.UNKNOWN;
      this.coords = props.coords || { x: 0, y: 0 };
    }
  }

  public getCellValue():number {
    return this.cellType;
  }

  public resetCell():void {
    this.cellType = CELLTYPE.UNKNOWN;
  }

  public setCellType(cell_type: CELLTYPE):void {
    this.cellType = cell_type;
  }

}

export default Cell;
