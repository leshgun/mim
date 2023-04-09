import Item from '@/core/Item'
import type { IItem } from '@/core/Item'



type TCoords = { x: number, y: number }

interface ICharacter extends IItem {
  coords: { x: number, y: number }
}


class Character extends Item implements ICharacter {

  public coords: TCoords = { x: 0, y: 0 };

  constructor (props:ICharacter) {
    super(props);
    this.coords = props?.coords || this.coords;
  }

  public move (coords:TCoords) {
    this.coords.x += coords.x || 0;
    this.coords.y += coords.y || 0;
  }

}

export default Character;
