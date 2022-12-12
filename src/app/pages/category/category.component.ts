import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Category } from 'src/app/interface/category.interface';
import { Images } from 'src/app/interface/images.interface';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public categories : Category[] = [];
  public images : Images[] =[];
  public isLoading : boolean = false;
  public searchCategory = new FormControl({value: ''})

  
  constructor(private _titulo: Title,
              private _catService: CatService ) {
        _titulo.setTitle('CATegories')
  }

  ngOnInit(): void {
    this.getCategories();
    this.searchCategory.setValue('')
    this.searchCategory.valueChanges.subscribe(value =>{
      this.isLoading = true
      this.getImagesByCategory(value);
    })
  }

  getCategories(){
    this._catService.getCategories().subscribe(
      categories =>{
        this.categories = categories;      
    })
  }

  getImagesByCategory(id_category: string){
    this._catService.getImagesByCategory(id_category).subscribe(images =>{
      this.images = images
      this.isLoading = false
    })
  }

}
