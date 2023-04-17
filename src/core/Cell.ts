import type Item from "@/core/Item"



/**
 * Possible types for the cell.
 * May contain some items.
 */
export enum CELLTYPE {
  UNKNOWN,
  EMPTY,
  WALL,
  VISITED,
  CHARACTER
}

/**
 * Each cell (item) has its own coordinates on the map.
 * These coordinates are inherited by cell items.
 */
export type TCoords = {
  x : number,
  y : number
}

export interface ICell {
  cellType?: CELLTYPE;
  coords?: TCoords;
  items?: Item[];
};



class Cell implements ICell {
  
  cellType: CELLTYPE = CELLTYPE.UNKNOWN;
  coords: TCoords = { x: 0, y: 0 };
  items: Item[] = [];

  /**
   * @param props contains cell parameters
   * @param props.cellType [?] type of the cell. Default: *Unknown*
   * @param props.coords [?] coordinates of the cell on map. Default: *{x: 0, y: 0}*
   * @param props.items [?] items on the cell
   */
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

  /**
   * Return the list of items of the cell whose id is equal to "*id*".
   * If no "*id*" is given, then returns all items.
   * @param id an unique id of a item
   * @returns A list (may be empty) of items
   */
  public getItems (id?:number):Item[] {
    if (id) return this.items.filter(item => item.id === id);
    return this.items;
  }

  /**
   * Reset cell to default configuration. Also delete all items on the cell.
   */
  public resetCell ():void {
    this.cellType = CELLTYPE.UNKNOWN;
    this.items = [];
  }

}

export default Cell;
