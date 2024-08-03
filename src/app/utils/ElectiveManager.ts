import { Elective } from "../domain/elective";
import { Slot } from "../domain/slot";

export default class ElectiveManager {
    static getElectivesWithNConflict(slotsSelected : Slot[], electives : Elective[], areFreeSlots : boolean) {
        let coincidencesElectives = new Map<Elective, number>();
        console.log("Slots selected: ", slotsSelected);
        electives.forEach((elective) => {
            let nConflict = this.getNConflict(slotsSelected, elective.eleSlots);
            nConflict = areFreeSlots ? elective.eleSlots.length - nConflict : nConflict;
            coincidencesElectives.set(elective, nConflict); 
        });

        return coincidencesElectives;
    }

    static getNConflict(slotsSelected : Slot[], eleSlots : Slot[]){
        let nConflict = 0;

        slotsSelected.forEach(slotSelected => {
            eleSlots.forEach(slot => {
                if(slotSelected.equals(slot)) {
                    nConflict = nConflict + 1;
                }
            });
        });

        return nConflict;
    }

    static getElectivesByNConflict(slotsSelected : Slot[], electives : Elective[], nConflict : number) {
        let coincidencesElectives : Array<Elective> = [];

        electives.forEach((elective) => {
            if(this.hasNConflict(slotsSelected, elective.eleSlots, nConflict)) {
                coincidencesElectives.push(elective);
            }
        });

        return coincidencesElectives;
    }

    static getElectivesByFreeSlots(slotsSelected : Slot[], electives : Elective[], nConflict : number) {
        let coincidencesElectives : Array<Elective> = [];

        electives.forEach((elective) => {
            if(this.hasNConflict(slotsSelected, elective.eleSlots, elective.eleSlots.length - nConflict)) {
                coincidencesElectives.push(elective);
            }
        });

        return coincidencesElectives;
    }

    static hasNConflict(slotsSelected : Slot[], eleSlots : Slot[], conflictLimit : number) {
        let nConflict = 0;

        slotsSelected.forEach(slotSelected => {
            eleSlots.forEach(slot => {
                if(slotSelected.equals(slot)) {
                    nConflict = nConflict + 1;
                }
            });
        });

        return nConflict == conflictLimit;
    }

    static getElectivesByModality(electives: Elective[], modality: string) {
        let filteredElectives: Elective[] = [];

        if(modality !== 'Cualquiera') {
            electives.forEach((elective) => {
                if (elective.eleMode === modality) {
                    filteredElectives.push(elective);
                }
            });
            return filteredElectives;
        }
        return electives;
    }
    
}