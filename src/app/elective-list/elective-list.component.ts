import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ElectiveService } from '../service/elective.service';
import { Elective } from '../domain/elective';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Slot } from '../domain/slot';
import ElectiveManager from '../utils/ElectiveManager';

@Component({
  selector: 'app-elective-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './elective-list.component.html',
  styleUrl: './elective-list.component.css'
})
export class ElectiveListComponent {

  electiveList: Elective[] = [];
  filteredElectives: Map<Elective, number> = new Map<Elective, number>();
  @Input() selectedSlots : Slot[] = [];
  @Input() freeSlotsMode! : boolean;
  @Output() selectedElective = new EventEmitter<Elective>();
  selectedElectiveDetails: Elective | null = null;

  

  filterForm: FormGroup = new FormGroup({
    periods: new FormControl(0),
    modality: new FormControl('Cualquiera'),
  });


  constructor(private electiveService: ElectiveService,
              private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.loadElectives();
  }

  loadElectives() {
    this.electiveService.getAllElectives().subscribe({
      next: (electives: Elective[]) => {
        this.electiveList = electives;
        this.filteredElectives = ElectiveManager.getElectivesWithNConflict(this.selectedSlots, electives, this.freeSlotsMode);
      },
      error: (error) => {console.error('Error loading electives: ', error);}
    });
  }

  applyFilters() {
    const periods = this.filterForm.get('periods')?.value;
    const modality = this.filterForm.get('modality')?.value;
    console.log("periods: ", periods);
    console.log("modality: ", modality);

    this.filteredElectives = ElectiveManager.getElectivesWithNConflict(this.selectedSlots, this.electiveList, this.freeSlotsMode);

    for(let [elective, conflicts] of this.filteredElectives) {
      if(!((elective.eleMode === modality || modality === "Cualquiera") && conflicts == periods)) {
        this.filteredElectives.delete(elective);
      }
    }

    console.log("Filtered electives: ", this.filteredElectives);
  }

  selectElective(elective: Elective) {
    this.selectedElective.emit(elective);
    this.selectedElectiveDetails = this.selectedElectiveDetails == elective ? null : elective;
    console.log("electivo seleccionado: ",this.selectedElectiveDetails)
  }

}
