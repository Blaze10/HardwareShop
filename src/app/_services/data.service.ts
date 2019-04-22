import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  mainCategoryList: AngularFireList<any>;
  subCategoryList: AngularFireList<any>;
  companyList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {}

  getMainCategoryList() {
    this.mainCategoryList = this.db.list('chinmay/mainCategoryList');
    return this.mainCategoryList;
  }

  getSubCategoryList() {
    this.subCategoryList = this.db.list('chinmay/subCategoryList');
    return this.subCategoryList;
  }

  getCompanyList() {
    this.companyList = this.db.list('chinmay/companyList');
    return this.companyList;
  }

  getSubCategoryByCategory(category) {
    return this.db.list('chinmay/subCategoryList', ref => ref.orderByChild('mainCategoryName')
    .equalTo(category));
  }
}
