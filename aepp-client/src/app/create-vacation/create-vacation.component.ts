import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-vacation',
  templateUrl: './create-vacation.component.html',
  styleUrls: ['./create-vacation.component.css']
})
export class CreateVacationComponent implements OnInit {
  @Input() factory: any;
  form: any = {};

  constructor() { }

  async ngOnInit() {
    console.log(this.factory);
  }


  async createVacation(form: any) {  
    form = Object.apply({}, form);  
    form.entryFee = form.entryFee * 1e18;
    console.log(form.deadline);
    form.deadline = Math.floor(new Date(form.deadline) as any /1000);
    form.dateBegin = Math.floor(new Date(form.dateBegin) as any /1000);
    form.dateEnd = Math.floor(new Date(form.dateEnd) as any /1000);
    form.maxParticipants = 2;
    form.whitelist = [];
    console.log(window['web3'].eth.coinbase);
    let address = await this.factory.createVacation.call(form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants, { from: window['web3'].eth.coinbase });
    
    console.log(form, address);
    await this.factory.createVacation(form.entryFee, form.deadline, form.dateBegin, form.dateEnd, form.whitelist, form.maxParticipants,{ from: window['web3'].eth.coinbase });
    
  }
}
