export enum ITEMID {
  Character = 100,
  Smoke = 101
}



export interface IItem {
  id: number
};

class Item implements IItem {
  
  public id: number;

  constructor (props: IItem) {
    this.id = props.id;
  }

}

export default Item;
