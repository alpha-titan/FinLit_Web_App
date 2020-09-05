import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from './default.component';
import {DashboardComponent} from 'src/app/modules/dashboard/dashboard.component'
import { RouterModule } from '@angular/router';
import {PostsComponent} from 'src/app/modules/posts/posts.component'
import {SharedModule} from 'src/app/shared/shared.module'
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card'
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import {StocksComponent} from 'src/app/modules/stocks/stocks.component'
import {ContactsComponent} from 'src/app/modules/contacts/contacts.component'
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    ContactsComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DefaultModule { }
