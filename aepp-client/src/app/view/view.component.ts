import { Component, OnInit, Inject } from '@angular/core';
import { ContractService } from '../contract.service';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  vacation: any;

  constructor(
    @Inject(ContractService) public contractService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!this.vacation) {
        this.contractService.initWeb3()
          .then(() => {
            this.vacation = this.contractService.vacationContract.at(params.address);
            this.vacation.priceInWei((err, res) => {
              console.log(+res);
            })
          })
      }
    });
  }

}
