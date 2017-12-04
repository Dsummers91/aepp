import { Component, OnInit, Input, Inject } from '@angular/core';
import { ContractService } from '../contract.service';
@Component({
  selector: 'app-join-vacation',
  templateUrl: './join-vacation.component.html',
  styleUrls: ['./join-vacation.component.css']
})
export class JoinVacationComponent implements OnInit {
  @Input() factory: any;
  vacations: string[] = [];

  constructor(
    @Inject(ContractService) public contractService
  ) { }

  ngOnInit() {
    this.vacations = [];
    if(!this.factory) {
      this.contractService.initWeb3()
        .then(() => {
          this.factory = this.contractService.factoryContract;
          this.factory.getVacationLength((err, res) => {
            for(let i=+res; i > 0; i--) {
              this.factory.getVacationByIndex(i, (err,res) => {
                this.vacations.push(res);
              })
            }
          })
        })
    }
  }
}