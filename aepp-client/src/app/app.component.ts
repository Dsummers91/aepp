import { Component, OnInit } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider';
import * as vacationFactoryArtifacts from '../../../aepp-blockchain/build/contracts/VacationFactory.json';
import * as vacationArtifacts from '../../../aepp-blockchain/build/contracts/Vacation.json';

declare var Web3: any;
const abi = [{ "constant": true, "inputs": [], "name": "hello", "outputs": [{ "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
  }

}