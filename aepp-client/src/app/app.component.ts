import { Component, OnInit } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider';
import * as vacationFactoryArtifacts from '../../../aepp-blockchain/build/contracts/VacationFactory.json';
import * as vacationArtifacts from '../../../aepp-blockchain/build/contracts/VacationBasic.json';

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

  ngOnInit() {
    let web3Provider = false;
    let IdManagerProvider = IdManagerProviderWrapper.default;
    let web3 = window['web3'];
    let idManager = new IdManagerProvider({
      rpcUrl: 'http://localhost:9545',
      skipSecurity: true
    })
    idManager.checkIdManager().then( async (idManagerPresent) => {
        if (idManagerPresent ) {
            web3 = new Web3(idManager.web3.currentProvider)
        } else if (typeof web3 !== 'undefined') { // Metamask
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = null;
        }
 
        if (web3) {
          this.web3 = web3;
          web3.version.getNetwork((err,res) => {
            let factoryArtifact: any = vacationFactoryArtifacts;
            let vacationArtifact: any = vacationArtifacts;

            let vacationContract = factoryArtifact.networks[res];
            this.web3.eth.contract(factoryArtifact.abi).at(vacationContract.address)
              .vacationLibrary((err, res) => {
                console.log(err, res);
              })  
          })
        } else {
            // Not Ready
        }
    })

  }
}