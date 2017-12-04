import { Component, OnInit } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider';
import * as vacationFactoryArtifacts from '../../../aepp-blockchain/build/contracts/VacationFactory.json';
import * as vacationArtifacts from '../../../aepp-blockchain/build/contracts/Vacation.json';

declare var Web3: any;
const abi = [{"constant":true,"inputs":[],"name":"hello","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"}];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  web3: any;
  tab: any;
  vacationContract: any;
  factoryContract: any;
  vacationArtifact: any;
  factoryArtifact: any;


  ngOnInit() {
    let web3Provider = false;
    let IdManagerProvider = IdManagerProviderWrapper.default;
    let web3 = window['web3'];
    let idManager = new IdManagerProvider({
      rpcUrl: 'http://localhost:9545',
      skipSecurity: true
    })
    idManager.checkIdManager().then( async (idManagerPresent) => {
      console.log(idManagerPresent)
        if (idManagerPresent ) {
            web3 = new Web3(idManager.web3.currentProvider)
        } else if (typeof web3 !== 'undefined') { // Metamask
          console.log(web3.currentProvider);
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
        }
 
        if (web3) {
          this.web3 = web3;
          console.log(web3.eth.coinbase);
          web3.version.getNetwork((err,res) => {
            this.factoryArtifact = vacationFactoryArtifacts;
            this.vacationArtifact = vacationArtifacts;
            this.factoryContract = web3.eth.contract(vacationFactoryArtifacts['abi']).at(this.factoryArtifact.networks[res].address);
            this.vacationContract = this.vacationArtifact.networks[res]; 
            this.getVacationLibrary();
          })
        } else {
            // Not Ready
        }
    })
  }

  getVacationLibrary() {
    this.web3.eth.contract(this.factoryArtifact.abi).at(this.vacationContract.address)
    .vacationLibrary((err, res) => {
      console.log(err, res);
    }) 
  }
}