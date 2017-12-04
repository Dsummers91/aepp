import { Component, OnInit, Input, Inject } from '@angular/core';

import { ContractService } from '../contract.service';

@Component({
  selector: 'app-create-vacation',
  templateUrl: './create-vacation.component.html',
  styleUrls: ['./create-vacation.component.css']
})
export class CreateVacationComponent implements OnInit {
  @Input() factory: any;
  form: any = {};
  address: string;
  txHash: string;
  submitted: boolean;

  constructor(
    @Inject(ContractService) public contractService
  ) { }

  async ngOnInit() {
    if (!this.factory) {
      this.contractService.initWeb3()
        .then(() => {
          this.factory = this.contractService.factoryContract;
        });
      }
  }


  async createVacation(form: any) {
    form = Object.apply({}, form);
    form.entryFee = form.entryFee * 1e18;
    console.log(form.deadline);
    form.deadline = Math.floor(new Date(form.deadline) as any / 1000);
    form.dateBegin = Math.floor(new Date(form.dateBegin) as any / 1000);
    form.dateEnd = Math.floor(new Date(form.dateEnd) as any / 1000);
    form.maxParticipants = 2;
    form.whitelist = [];
    this.factory.createVacation.call(form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants, (err, address) => {
      this.factory.createVacation(form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants, (err, txHash) => {
        this.address = address;
        this.txHash = txHash;
        this.submitted = true;
      });
    });
  }
}
