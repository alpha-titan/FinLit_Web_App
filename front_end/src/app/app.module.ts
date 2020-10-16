import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button'; 

import {MatCardModule} from '@angular/material/card'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DefaultModule} from './layouts/default/default.module';
import { AuthService } from './services/auth.service';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { UsersComponent } from './modules/users/users.component';
import { AddArticleComponent } from './modules/add-article/add-article.component';
import { InvestingComponent } from './modules/investing/investing.component';
import { ManageArticlesComponent } from './modules/manage-articles/manage-articles.component';
import { StocksComponent } from './modules/stocks/stocks.component';
import { MatLabel } from '@angular/material/form-field';
import { TradingComponent } from './modules/trading/trading.component';
import { EditArticleComponent } from './modules/edit-article/edit-article.component';
import { ManageContactsComponent } from './modules/manage-contacts/manage-contacts.component';
import { NgSearchPipe } from 'ng-search-pipe';
import { ArticleDetailsComponent } from './modules/article-details/article-details.component';
import { EditCommentComponent } from './modules/article-details/edit-comment/edit-comment.component'; // import here
import { ValidateEqualModule } from 'ng-validate-equal';
import { AnalystsComponent } from './modules/analysts/analysts.component';
import { MessageComponent } from './modules/message/message.component';
import { AnalystMessagesComponent } from './modules/analyst-messages/analyst-messages.component';
import { LandingComponent } from './landing/landing.component';
import { RespondComponent } from './modules/analyst-messages/respond/respond.component';
import { AddStockComponent } from './modules/add-stock/add-stock.component';
import { EditStockComponent } from './modules/edit-stock/edit-stock.component';
import { StickyNavModule } from 'ng2-sticky-nav';
import { EditorModule } from "@tinymce/tinymce-angular";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
    EditProfileComponent,
    UsersComponent,
    AddArticleComponent,
    InvestingComponent,
    ManageArticlesComponent,
    StocksComponent,
    TradingComponent,
    EditArticleComponent,
    ManageContactsComponent,
    ArticleDetailsComponent,
    EditCommentComponent,
    AnalystsComponent,
    MessageComponent,
    AnalystMessagesComponent,
    LandingComponent,
    RespondComponent,
    AddStockComponent,
    EditStockComponent
  ],
  imports: [
    FormsModule,
    MatCardModule,
    BrowserModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    ToastrModule.forRoot(), // ToastrModule added,
    FileUploadModule,
    NgSearchPipe,
    ValidateEqualModule,
    StickyNavModule,
    EditorModule

 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
