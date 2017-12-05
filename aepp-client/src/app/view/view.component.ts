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
  entryFee: string;
  deadline: any;
  participants: string[] = [];
  startDate: any;
  endDate: any;
  maxParticipants: number;
  itinerary: string;
  agent: any;
  isAgent: boolean;

  constructor(
    @Inject(ContractService) public contractService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!this.vacation) {
      this.getData();
    }
    setTimeout(() => {
      this.getData();
    }, 1000)
  }

  join() {
    this.vacation.buyin({ value: +this.entryFee * 1e18 }, (err, res) => {
      this.vacation.getParticipants((err, res) => {
        this.participants = res;
      })
    })
  }

  submitItinerary(url: string) {
    this.vacation.agentSubmitVacation(url, (err, res) => {
      this.participants = res;
    })
  }
  getData() {
    this.route.params.subscribe(params => {
      this.contractService.initWeb3()
        .then(() => {
          this.vacation = this.contractService.vacationContract.at(params.address);
          this.vacation.priceInWei((err, res) => {
            this.entryFee = window['web3'].fromWei(res, 'ether');
          })
          this.vacation.registrationDeadline((err, res) => {
            this.deadline = new Date(res * 1000);
          })
          this.vacation.getDuration((err, res) => {
            this.startDate = new Date(res[0] * 1000);
            this.endDate = new Date(res[1] * 1000);
          });
          this.vacation.maxParticipants((err, res) => {
            this.maxParticipants = +res;
          })
          this.vacation.itinerary((err, res) => {
            this.itinerary = res;
          })
          this.vacation.getParticipants((err, res) => {
            this.participants = res;
          })
          this.agent = this.contractService.agentContract;
          this.agent.isAgent((err,res) => {
            this.isAgent = res;
          })
        })
    });
  }
}
