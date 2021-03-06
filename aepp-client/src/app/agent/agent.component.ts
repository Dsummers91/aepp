import { Component, OnInit, Input, Inject } from '@angular/core';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agent: any;
  token: any;
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

  approve() {
    this.token.approve(this.agent.address, 1e18, (err, res) => {
      console.log(err, res);
    })
  }
  
  register() {
    this.agent.register((err, res) => {
      console.log(err, res);
    })
  }

    populateData() {
      this.contractService.initWeb3()
      .then(() => {
        this.token = this.contractService.tokenContract;
        this.token.balanceOf("0x1C7D0DAdF33fDe8f517517931C30206737f4413F", (err,res) => {
          console.log(res);
        })
        this.agent = this.contractService.agentContract;
        this.agent.isAgent((err,res) => {
          console.log(res);
          this.isAgent = res;
        })
      });
    }
}
