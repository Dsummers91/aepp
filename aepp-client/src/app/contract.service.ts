import { Injectable } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider';
import * as vacationFactoryArtifacts from '../../../aepp-blockchain/build/contracts/VacationFactory.json';
import * as vacationArtifacts from '../../../aepp-blockchain/build/contracts/Vacation.json';

declare var Web3: any;

@Injectable()
export class ContractService {
  web3: any;
  vacation:any;

  constructor() {}

  init() {
  }

}
