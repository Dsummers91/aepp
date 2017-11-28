import { Component, OnInit } from '@angular/core';
import * as IdManagerProviderWrapper from '@aeternity/id-manager-provider'


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
    idManager.checkIdManager().then( (idManagerPresent) => {
        if (idManagerPresent ) {
            web3 = new Web3(idManager.web3.currentProvider)
        } else if (typeof web3 !== 'undefined') { // Metamask
            web3 = new Web3(web3.currentProvider);
        } else {
            web3 = null;
        }
 
        if (web3) {
          this.web3 = web3;
          console.log(this.web3.eth.contract(abi).at("0x345ca3e014aaf5dca488057592ee47305d9b3e10"));
          this.web3.eth.contract(abi).at("0x345ca3e014aaf5dca488057592ee47305d9b3e10")
            .hello((err, res) => {
              console.log(err, res);
            })  
        } else {
            // Not Ready
        }
    })

  }
}