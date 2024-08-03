import { Period } from "./period";
import { Slot } from "./slot";

export class Elective{
 eleCode: string;
 eleName: string;
 eleModule: string;
 eleMode: string;
 eleSlots: Slot[];
 eleInstructor: string;

 constructor(eleCode: string, eleName: string, eleModule: string, eleMode: string, eleSlots: Slot[], eleInstructor: string){
     this.eleCode = eleCode;
     this.eleName = eleName;
     this.eleModule = eleModule;
     this.eleMode = eleMode;
     this.eleSlots = eleSlots;
     this.eleInstructor = eleInstructor
 }

 equals(elective: Elective): boolean{
    return this.eleCode === elective.eleCode && this.eleModule === elective.eleModule;
 }

 isInDayPeriod(day: string, period: Period): boolean {
    for (let slot of this.eleSlots) {
      if (slot.sloDay === day && slot.sloPeriod === period.periodName) {
        return true;
      }
    }
    return false;
  }

}