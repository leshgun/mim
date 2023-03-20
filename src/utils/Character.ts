import Cell from '@/utils/Cell'
import { type ICell, CELLTYPE } from '@/utils/Cell'



enum CHARACTERTYPE {

}

interface ICharacter extends ICell {

}


class Character extends Cell implements ICharacter {

  constructor (props?:ICharacter) {
    super({...props, coords: undefined, cellType: CELLTYPE.CHARACTER});
  }

}

export default Character;
