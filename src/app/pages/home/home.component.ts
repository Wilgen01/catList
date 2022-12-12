import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Breeds } from 'src/app/interface/catApi.interface';
import { CatService } from 'src/app/services/cat.service';
import { FormControl } from '@angular/forms';
import { Filter } from 'src/app/interface/filter.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  public isLoaded: boolean= false;
  @ViewChild('scroll') scroll !: ElementRef

  public breeds !: Breeds[]
  public filteredBreeds : Breeds[] = [];
  public filters: Filter = {name: '', origin: ''}
  public originList !: Set<string>;
  public itemsByPage : number = 15 ;
  public totalPages !: number;
  public currentPage : number =1;
  public notFound : boolean = false; 
  public searchName = new FormControl({value: ''})
  public searchOrigin = new FormControl({value: ''})
  public page = new FormControl({value: ''})


  constructor(private _titulo: Title, 
              private _catService: CatService) {
    _titulo.setTitle('CatList')
   }

  ngOnInit(): void {
    this.searchName.setValue('')
    this.searchOrigin.setValue('')
    this.page.setValue(1)
    this.searchName.valueChanges.subscribe(value => {
      this.filters.name = value.trim()
      this.searchCat()
    })
    this.searchOrigin.valueChanges.subscribe(value =>{
      this.filters.origin = value.trim()
      this.searchCat()
    })
    this.getCats();
    this.getPage();
  }

  getCats(){
    this._catService.getBreeds().subscribe(
      breeds =>{
        this.breeds = breeds
        this.totalPages =  this.setPagination(15)
        this.originList =  this.getOriginList()
        this.isLoaded = true 
      }
    )
  }

  setPagination(itemsByPage : number): number{
    return Math.floor(this.breeds.length / itemsByPage)
  }

  getBreedsOrFilteredBreeds(){
    if (this.filteredBreeds.length == 0) {
      let desde= this.itemsByPage * this.currentPage
      if (this.currentPage == 1) desde = 0
      this.notFound = false;
      return [...this.breeds.slice(desde, desde+15)]
    }else{
      this.notFound = false;
      return this.filteredBreeds
    }
  }



  getOriginList(){
    return new Set(this.breeds.map(c => c.origin))    
  }


  searchCat(){
    this.notFound = false;
    if (this.filters.name.length == 0 && this.filters.origin.length == 0) {
      this.filteredBreeds = []
      return
    }
    this.filteredBreeds = this.breeds.filter(breed => {
      const nameLowerCase = this.filters.name.toLocaleLowerCase();
      const originLowerCase = this.filters.origin.toLocaleLowerCase();
      return  breed.name.toLocaleLowerCase().includes(nameLowerCase) && 
              breed.origin.toLocaleLowerCase().includes(originLowerCase)
    })
    if (this.filteredBreeds.length == 0) {
      this.notFound = true;
    }
  }

  getPage(){
    this.page.valueChanges.subscribe(value =>{
      this.currentPage = value
      this.scroll.nativeElement.scrollIntoView({behavior: "smooth", block: "start"})
    })    

    
  }


}
