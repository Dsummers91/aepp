import { Injectable } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider';
import * as vacationFactoryArtifacts from '../../../aepp-blockchain/build/contracts/VacationFactory.json';
import * as vacationArtifacts from '../../../aepp-blockchain/build/contracts/Vacation.json';
import * as agentArtifacts from '../../../aepp-blockchain/build/contracts/TravelAgentRegistry.json';


declare var Web3: any;

@Injectable()
export class ContractService {

  web3: any;
  vacationContract: any;
  factoryContract: any;
  agentContract: any;
  vacationArtifact: any;
  factoryArtifact: any;
  agentArtifact: any;
  constructor() {}

  initWeb3(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(this.web3) resolve(false);
      let web3Provider = false;
      let IdManagerProvider = IdManagerProviderWrapper.default;
      let web3 = window['web3'];
      let idManager = new IdManagerProvider({
        rpcUrl: 'http://localhost:8545',
        skipSecurity: true
      })
      idManager.checkIdManager().then(async (idManagerPresent) => {
        if (idManagerPresent) {
          web3 = new Web3(idManager.web3.currentProvider)
        } else if (typeof web3 !== 'undefined') { // Metamask
          web3 = new Web3(web3.currentProvider);
        } else {
          web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        if (web3) {
          this.web3 = web3;
          web3.version.getNetwork((err, res) => {
            console.log(res);
            this.factoryArtifact = vacationFactoryArtifacts;
            this.vacationArtifact = vacationArtifacts;
            this.agentArtifact = agentArtifacts;
            console.log(this.factoryArtifact.networks);
            this.factoryContract = web3.eth.contract(vacationFactoryArtifacts['abi']).at(this.factoryArtifact.networks[res].address);
            this.agentContract = web3.eth.contract(agentArtifacts['abi']).at(this.agentArtifact.networks[res].address);
            this.vacationContract = web3.eth.contract(vacationArtifacts['abi']);
            return resolve(true);
          })
        } else {
          return resolve(false);
        }
      })
    })
  }

}
