import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Breeds } from 'src/app/interface/catApi.interface';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cat-detail',
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {

  public catId : string = '';
  public breed !: Breeds;
  public isLoaded : boolean = false;

  constructor(private _titulo : Title,
              private _router : ActivatedRoute,
              private _catService: CatService) { }

  ngOnInit(): void {
    this.getParams();
    this.getCats();
  }

  getParams(){
    this._router.params.subscribe(
      ({id_breed}) =>{
        this.catId = id_breed;
      }
    )
  }

  getCats(){
    this._catService.getBreeds().subscribe(
      breeds =>{
        const breed = this.getCatDetail(breeds);
        if (breed) this.breed = breed;        
        this._titulo.setTitle(`CatDetail | ${this.breed.name}`)
      }
    )
  }

  getCatDetail(breeds : Breeds[]){
    this.isLoaded = true
   return breeds.find(breed => breed.id === this.catId);
  }

  

}
