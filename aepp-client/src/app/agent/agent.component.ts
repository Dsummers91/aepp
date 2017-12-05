import { Component, OnInit, Input, Inject } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agent: any;
  isAgent: boolean;

  constructor(
    @Inject(ContractService) public contractService
  ) { }

  ngOnInit() {
    if (!this.agent) {
      this.populateData();
      }
      setTimeout(() => {
        this.populateData();
      }, 1000)
  }

    register() {
      this.agent.register((err, res) => {
        console.log(res);
      })
    }

    populateData() {
      this.contractService.initWeb3()
      .then(() => {
        this.agent = this.contractService.agentContract;
        this.agent.isAgent((err,res) => {
          this.isAgent = res;
        })
      });
    }
}
