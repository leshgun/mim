import type Item from "@/core/Item"



export enum CELLTYPE {
  UNKNOWN,
  EMPTY,
  WALL,
  VISITED,
  CHARACTER
}

export type TCoords = {
  x : number,
  y : number
}

export interface ICell {
  cellType?: CELLTYPE;
  coords?: TCoords;
  items?: Item[];

  // addItem(item:Item):void;
  // deleteItem(item:Item):void;
  // resetCell(item:Item):void;
};



class Cell implements ICell {
  
  cellType: CELLTYPE = CELLTYPE.UNKNOWN;
  coords: TCoords = { x: 0, y: 0 };
  items: Item[] = [];

  constructor (props?: ICell) {
    this.cellType = props?.cellType || this.cellType;
    this.coords = props?.coords || this.coords;
    this.items = props?.items || this.items
  }

  public addItem (item:Item):void {
    this.items.push(item);
  }

  public deleteItem (item:Item):void {
    this.items = this.items.filter (i => i.id !== item.id);
  }

  public resetCell ():void {
    this.cellType = CELLTYPE.UNKNOWN;
  }

}

export default Cell;
