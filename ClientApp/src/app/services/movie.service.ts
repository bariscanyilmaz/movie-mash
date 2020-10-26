import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from "../models/movie";
import { RateViewModel } from '../models/rateViewModel';
import { Subject, of } from 'rxjs';
import { k_combinations } from '../utility';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private _movies: Subject<Movie[]> = new Subject<Movie[]>();
  private movies: Movie[];

  constructor(private http: HttpClient) {

  }

  getAll() {
    this.http.get<Movie[]>('/api/Movies').subscribe(res => { 
      this.movies=res;
      this._movies.next(res) 
    },(err:Error)=>{console.log(err)});
    return this._movies.asObservable();
  
  }


  rate(rateModel: RateViewModel) {
    return this.http.post('/api/Movies/Rate', rateModel);
  }

  
  getCombinations() {
    
    return of(k_combinations<Movie>(this.movies,2));
  }


}
