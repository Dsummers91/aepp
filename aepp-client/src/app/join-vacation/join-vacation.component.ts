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
    this.getData();
    setTimeout(() => {
      this.getData()
    }, 1000)
  }

  getData() {
    this.contractService.initWeb3()
    .then(() => {
      this.factory = this.contractService.factoryContract;
      this.factory.getVacationLength((err, res) => {
        this.vacations = [];
        for(let i=+res-1; i >= 0; i--) {
          this.factory.getVacationByIndex(i, (err,res) => {
            this.vacations.push(res);
          })
        }
      })
    })
  }
}