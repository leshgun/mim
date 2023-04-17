
interface IIni {
  filename: string,
  path?: string
}



class Ini implements IIni {

  public filename: string;
  public path: string = '@';

  constructor(props:IIni) {
    this.filename = props.filename;
    this.path = props?.path || this.path;
  }

  public fileOpen(path?: string) : void {
    
  }

}
