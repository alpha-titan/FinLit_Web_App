import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import {PostsComponent} from './modules/posts/posts.component'
import { combineLatest } from 'rxjs';
import { StocksComponent } from './modules/stocks/stocks.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard'
import { EditProfileComponent } from './modules/edit-profile/edit-profile.component';
import { UsersComponent } from './modules/users/users.component';
import { AddArticleComponent } from './modules/add-article/add-article.component';
import { InvestingComponent } from './modules/investing/investing.component';
import { ManageContactsComponent } from './modules/manage-contacts/manage-contacts.component'

import { ManageArticlesComponent } from './modules/manage-articles/manage-articles.component';
import { TickerInfoComponent } from './modules/stocks/ticker-info/ticker-info.component';
import { TradingComponent } from './modules/trading/trading.component';
import { EditArticleComponent } from './modules/edit-article/edit-article.component';
import { ArticleDetailsComponent } from './modules/article-details/article-details.component';
import { EditCommentComponent } from './modules/article-details/edit-comment/edit-comment.component';
const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  canActivate: [AuthGuard],
  children: [{
    path: '',
    component: DashboardComponent,
   }, {
    path: 'posts',
    component: PostsComponent
  },{
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'edit/:_id',
    component: EditProfileComponent
  },
  {
    path: 'editArticle/:_id',
    component: EditArticleComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  
  {
    path: 'st',
    component: TickerInfoComponent
  },
  {
    path: 'articles',
    component: ManageArticlesComponent
  },
  {
    path: 'Messages',
    component: ManageContactsComponent
  },
  {
    path: 'article-details/:_id',
    component: ArticleDetailsComponent
    ,  children: [{ path: 'edit-comment/:_id',
    component: EditCommentComponent
    }]
  },
  {
    path: 'investing',
    component: InvestingComponent
  },
  {
    path: 'trading',
    component: TradingComponent
  },

  {
    path: 'addarticle',
    component: AddArticleComponent
  }]},
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
},{
  path: 'login', component: UserComponent,
  children: [{ path: '', component: SignInComponent }]
}




]
  

  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
