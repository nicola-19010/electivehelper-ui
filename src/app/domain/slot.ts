export class Slot{
    sloPeriod: string;
    sloDay: string;
    startTime: string;
    endTime: string;
    sloPlace: string | undefined;
    constructor(period: string, day: string, startTime: string, endTime: string){
        this.sloPeriod = period;
        this.sloDay = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    equals(slot: Slot): boolean{
        return this.sloDay === slot.sloDay && this.sloPeriod === slot.sloPeriod;
    }
}