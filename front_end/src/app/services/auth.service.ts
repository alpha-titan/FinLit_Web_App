import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../models/user.model';
import { Article } from '../models/article.model';
import { Contact } from '../models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User= {
    email: '',
    password: '',
    image:'',
    role:''
  };
  selectedArticle: Article= {
    title: '',
    body: '',
    category:'',
    image:'',
    role:'',
    id:''

  };
  selectedContact: Contact= {
    name: '',
    email: '',
    phoneNumber:'',
    query:''
  };
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post("http://localhost:3000/api/register", user, this.noAuthHeader);
  }
  postMessage(contact: Contact) {
    return this.http.post("http://localhost:3000/api/send", contact);
  }
  postArticle(article:Article){
    return this.http.post("http://localhost:3000/api/addArticle", article);
  }

  login(authCredentials) {
    return this.http.post('http://localhost:3000/api//authenticate', authCredentials, this.noAuthHeader);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }
  getUserProfile() {
    return this.http.get('http://localhost:3000/api/userProfile');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
  updateUser(user: User, _id: String) {
    return this.http.put('http://localhost:3000/api/update/' + _id, user);
  }
  updateArticle(article: Article, _id: String) {
    return this.http.put('http://localhost:3000/api/updateArticle/' + _id, article);
  }
  getUsers() {
    return this.http.get<User[]>("http://localhost:3000/api/users")

  }
  getContacts() {
    return this.http.get<Contact[]>("http://localhost:3000/api/contacts")

  }
  getArticles() {
    return this.http.get<Article[]>("http://localhost:3000/api/articles")

    
  }
  getArticle(id:String) {
    return this.http.get<Article>("http://localhost:3000/api/article/"+id)

  }
  deleteArticle(id:String){
    return this.http.delete<Article>("http://localhost:3000/api/deleteArticle/"+id)
  }
  deleteUser(id:String){
    return this.http.delete<User>("http://localhost:3000/api/deleteUser/"+id)
  }

}
