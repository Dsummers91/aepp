import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatGridListModule, MatProgressSpinnerModule} from '@angular/material';
import { ContractService } from './contract.service';

import { AppComponent } from './app.component';
import { CreateVacationComponent } from './create-vacation/create-vacation.component';
import { JoinVacationComponent } from './join-vacation/join-vacation.component';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { AgentComponent } from './agent/agent.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateVacationComponent,
    JoinVacationComponent,
    RegisterAgentComponent,
    AgentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatGridListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
