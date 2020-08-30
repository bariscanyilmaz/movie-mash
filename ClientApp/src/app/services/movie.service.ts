import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from "../models/movie";
import { RateViewModel } from '../models/rateViewModel';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { 

  }

  getAll(){
    return this.http.get<Movie[]>('/api/Movies');  
  }

  rate(rateModel:RateViewModel){
    return this.http.post('/api/Movies/Rate',rateModel);
  }

  
}
