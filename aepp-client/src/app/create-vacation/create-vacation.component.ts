import { Component, OnInit, Input, Inject } from '@angular/core';

import { ContractService } from '../contract.service';
import { ActivatedRoute } from "@angular/router";

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
  isAgent: boolean;

  constructor(
    @Inject(ContractService) public contractService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.contractService.initWeb3()
      .then(() => {
        this.factory = this.contractService.factoryContract;
      });
  }


  async createVacation() {
    let form = Object.assign({}, this.form);
    form.entryFee = form.entryFee * 1e18;
    form.deadline = Math.floor(new Date(form.deadline) as any / 1000);
    form.dateBegin = Math.floor(new Date(form.dateBegin) as any / 1000);
    form.dateEnd = Math.floor(new Date(form.dateEnd) as any / 1000);
    form.maxParticipants = 2;
    form.whitelist = [];
    this.route.params.subscribe(params => {
      this.factory['create' + this.cap(params.type)].call(form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants, (err, address) => {
        this.factory['create' + this.cap(params.type)](form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants, (err, txHash) => {
          this.address = address;
          this.txHash = txHash;
          this.submitted = true;
        });
      });
    });
  }

  private cap(string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
