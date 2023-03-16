

export default class MyRandom {

  random () : number {
    return Math.random();
  }

  // (4, 7) => 6
  randomInterval(min:number, max:number):number {
    return Math.round(this.random()*(max-min) + min);
  }

  // 5 => [3, 4, 2, 0, 1]
  shuffle (arr:any[]) : void {
    const len = arr.length;
    arr.forEach((_, i) => {
      const rand_i = this.randomInterval(0, len-1);
      if (rand_i !== i)
        [arr[i], arr[rand_i]] = [arr[rand_i], arr[i]];
    })
  }

}
