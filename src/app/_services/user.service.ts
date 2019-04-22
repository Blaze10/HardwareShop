import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: AngularFireList<any>;

constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

 getAllUsers() {
   this.usersList = this.db.list('chinmay/userList');
   return this.usersList;
 }

 insertUser(user: User) {
  return this.usersList.push(user);
 }

 removeUser(key) {
  return this.usersList.remove(key);
 }

 getUserInfo(email) {
  return this.db.list('chinmay/userList', ref => ref.orderByChild('email').equalTo(email));
 }

 getAllUserEmailList() {
   return this.db.list('chinmay/userList', ref => ref.orderByChild('email'));
 }

}
