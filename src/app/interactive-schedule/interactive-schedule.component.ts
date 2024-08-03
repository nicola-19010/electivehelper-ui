import { Component } from '@angular/core';
import { Period } from '../domain/period';
import { Slot } from '../domain/slot';
import { CommonModule } from '@angular/common';
import { Elective } from '../domain/elective';
import { ElectiveService } from '../service/elective.service';
import { ElectiveListComponent } from "../elective-list/elective-list.component";

@Component({
  selector: 'app-interactive-schedule',
  standalone: true,
  imports: [CommonModule, ElectiveListComponent],
  templateUrl: './interactive-schedule.component.html',
  styleUrl: './interactive-schedule.component.css'
})
export class InteractiveScheduleComponent {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  periods: Period[] = Period.getPeriods();
  selectedSlots: Slot[] = [];
  electiveList: Elective[] = [];
  selectedElective: Elective | null = null;
  freeSlotsMode:boolean = true;

  constructor(private electiveService: ElectiveService){}

  ngOnInit() {
    this.loadElectives();
  }

  selectSlot(day: string, period: Period) {
    let slot = new Slot(Period.getPeriodNumber(period), day, period.startTime, period.endTime);
    if(this.removeSlot(slot)) {
      console.log('Slot removed: ',slot);
    }else {
      this.selectedSlots.push(slot);
      console.log('Slot added: ',slot);
    }
  }

  removeSlot(slotToRemove: Slot): boolean {
    for (let slot of this.selectedSlots) {
      if (slot.equals(slotToRemove)) {
        this.selectedSlots.splice(this.selectedSlots.indexOf(slot), 1);
        return true;
      }
    }
    return false;
  }

  isSlotSelected(day: string, period: Period): boolean {
    let slot = new Slot(Period.getPeriodNumber(period), day, period.startTime, period.endTime);
    return this.selectedSlots.some(selectedSlot => selectedSlot.equals(slot));
  }

  loadElectives() {
    this.electiveService.getAllElectives().subscribe({
      next: (electives: Elective[]) => {this.electiveList = electives;},
      error: (error) => {console.error('Error loading electives: ', error);}
    });
  }

  onElectiveSelected(elective: Elective) {
    this.selectedElective = this.selectedElective == elective ? null : elective;
    console.log('Selected elective: ', elective);
  }

  sameDayAndPeriod(elective: Elective, day: string, period: string) {
    let periodNumber = period.replace("°","").trim();
    for(let slot of elective.eleSlots){
      let elePeriodNumber = slot.sloPeriod.replace("°","").trim();
      if(elePeriodNumber == periodNumber && slot.sloDay == day){
        return true;
      }
    }
    return false;
  }

  getElectivePlace(elective: Elective, day: string, period: Period) {
    let place;
    elective.eleSlots.forEach(slot => {
      if(slot.sloDay == day && slot.sloPeriod == Period.getPeriodNumber(period)) {
        place = slot.sloPlace;
      }
    });

    return place;
  }
  
  cleanSlots() {
    this.selectedSlots = [];
    this.selectedElective = null;
  }

  fillSlots(){
    this.selectedSlots = this.getAllSlots();
  }

  getAllSlots() {
    let slots: Slot[] = [];

    this.days.forEach(day => {
      this.periods.forEach(period => {
        slots.push(new Slot(Period.getPeriodNumber(period), day, period.startTime, period.endTime));
      })
    })

    return slots;
  }

  changeMode() {
    this.freeSlotsMode = !this.freeSlotsMode;
    this.cleanSlots();
    console.log(this.freeSlotsMode);
  }
}
