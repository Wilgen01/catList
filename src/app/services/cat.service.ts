import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Breeds } from '../interface/catApi.interface';
import { Category } from '../interface/category.interface';
import { Images } from '../interface/images.interface';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private apiUrl : string = environment.URL_API;
  private apiKey: string = environment.API_KEY; 
  

  constructor(private http: HttpClient ) { }

  getBreeds(){
    return this.http.get<[Breeds]>(this.apiUrl + 'breeds')
  }

  getCategories(){
    return this.http.get<[Category]>(this.apiUrl + 'categories')
  }

  getImagesByCategory(id_category: string){
    const headers = { 'x-api-key': this.apiKey};
    let params = new HttpParams();
    params = params.set('category_ids', id_category )
    params = params.set('limit', '20' )
    return this.http.get<[Images]>(this.apiUrl + 'images/search', {headers, params})
  }
}
