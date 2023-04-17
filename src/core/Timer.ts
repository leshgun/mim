
type Time = {
  seconds?: number,
  minutes?: number,
  hours?: number
}

enum TimeFormat {
  s, ss, m, mm, h, hh,
  mm_ss, hh_mm, hh_mm_ss
}

interface ITimer {
  step: number;
  counter?: number;
  update_frequency?: number;

  start(): Promise<void>;
  stop(): void;
  reset(): void;
}



class Timer implements ITimer {

  step: number = 1;
  counter: number = 0;
  update_frequency: number = 1;
  
  private timer: number = 0;

  constructor (props?: ITimer) {
    this.step = props?.step || this.step;
    this.counter = props?.counter || this.counter;
    this.update_frequency = props?.update_frequency || this.update_frequency;
  }

  // private add (time_1: Time, time_2: Time): Time {
  //   const new_time: Time = { seconds: 0, minutes: 0, hours: 0 }
  //   Object.keys(new_time).forEach(key => {
  //     new_time[key] = (time_1[key] || 0) + (time_2[key] || 0);
  //   })
  //   new_time.seconds = (new_time.seconds || 0) % 60;
  //   new_time.minutes = (Math.floor(new_time.seconds / 60) + (new_time.minutes || 0)) % 60;
  //   new_time.hours = Math.floor(new_time.minutes / 60) + (new_time.hours || 0);
  //   return new_time;
  // }

  public getTime(format: TimeFormat = TimeFormat.hh_mm_ss): any {
    const _time = [('0' + this.counter % 60).slice(-2)];
    if (this.counter > 60)
      _time.push(('0' + Math.floor(this.counter / 60) % 60).slice(-2));
    if (this.counter > 3600)
      _time.push(('0' + Math.floor(this.counter / 60 / 60)).slice(-2));
    switch (format) {
      case TimeFormat.mm_ss: return _time.reverse().slice(-2).join(':');
    }
    return _time.reverse().join(':');
  }

  private async tick(): Promise<void> {
    this.counter = (this.counter || 0) + this.step;
    // this.counter += 3600
    this.timer = setTimeout(() => this.tick(), (1 / this.update_frequency)*1000);
  }

  public async start(): Promise<void> {
    this.timer = setTimeout(() => this.tick(), (1 / this.update_frequency)*1000);
  }

  public stop(): void {
    clearTimeout(this.timer);
  }

  public reset(): void {
    this.stop();
    this.counter = 0;
    this.start();
  }

}

export default Timer
