import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatGridListModule, MatProgressSpinnerModule} from '@angular/material';
import { ContractService } from './contract.service';

import { AppComponent } from './app.component';
import { CreateVacationComponent } from './create-vacation/create-vacation.component';
import { JoinVacationComponent } from './join-vacation/join-vacation.component';
import { RegisterAgentComponent } from './register-agent/register-agent.component';
import { AgentComponent } from './agent/agent.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'list', component: JoinVacationComponent },
  { path: 'view/:address', component: ViewComponent },
  { path: 'create', component: CreateComponent },
  { path: 'create/vacation', component: CreateVacationComponent },
  { path: 'agent', component: AgentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CreateVacationComponent,
    JoinVacationComponent,
    RegisterAgentComponent,
    AgentComponent,
    HomeComponent,
    CreateComponent,
    ViewComponent
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
    FormsModule,
    RouterModule.forRoot(routes,{useHash: true})
    
  ],
  providers: [
    ContractService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
