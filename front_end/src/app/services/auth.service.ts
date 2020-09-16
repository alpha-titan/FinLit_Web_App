import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { User } from '../models/user.model';
import { Article } from '../models/article.model';
import { Contact } from '../models/contact.model';
import { Comment } from '../models/comment.model';
import { Message } from '../models/message.model';
import { Stock } from '../models/stock.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  selectedUser: User= {
    email: '',
    password: '',
    confirmpassword: '',
    username:'',

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
  selectedMessage: Message= {
    name: '',
    email: '',
    phoneNumber:'',
    query:'',
    id:''
  };
  selectComment:Comment={
    username:'',
    body:''
  }
  selectedStock:Stock={
    name:'',
    description:''
  }
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
  } updateComment(comment: Comment, _id: String) {
    return this.http.put('http://localhost:3000/api/updateComment/' + _id, comment);
  }
  getUsers() {
    return this.http.get<User[]>("http://localhost:3000/api/users")

  }
  getContacts() {
    return this.http.get<Contact[]>("http://localhost:3000/api/contacts")

  }
  getMessages() {
    return this.http.get<Message[]>("http://localhost:3000/api/messages")

  }
  getArticles() {
    return this.http.get<Article[]>("http://localhost:3000/api/articles")

    
  }
  getStocks() {
    return this.http.get<Stock[]>("http://localhost:3000/api/stocks")

    
  }
  getArticle(id:String) {
    return this.http.get<Article>("http://localhost:3000/api/article/"+id)

  }
  getUser(id:String) {
    return this.http.get<User>("http://localhost:3000/api/user/"+id)

  }
  getComment(id:String) {
    return this.http.get<Comment>("http://localhost:3000/api/comment/"+id)

  }
  deleteArticle(id:String){
    return this.http.delete<Article>("http://localhost:3000/api/deleteArticle/"+id)
  }
  deleteUser(id:String){
    return this.http.delete<User>("http://localhost:3000/api/deleteUser/"+id)
  }
  deleteComment(id:String){
    return this.http.delete<Comment>("http://localhost:3000/api/deleteComment/"+id)
  }
  deleteStock(id:String){
    return this.http.delete<Stock>("http://localhost:3000/api/deleteStock/"+id)
  }
  deleteMessage(id:String){
    return this.http.delete<Comment>("http://localhost:3000/api/deleteMessage/"+id)
  }
  addComment(comment:Comment,id:string){
    return this.http.post("http://localhost:3000/api/addComment/"+id,comment);

  }
  addStock(stock:Stock){
    return this.http.post("http://localhost:3000/api/addStock/",stock);

  }
  sendMessage(message:Message,id:string){
    return this.http.post("http://localhost:3000/api/sendMessage/"+id,message);

  }

}
