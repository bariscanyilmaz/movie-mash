import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movie[];

  constructor(private movieService: MovieService) {

  }


  ngOnInit(): void {
    
    this.movieService.getAll().subscribe(r => {
      this.movies = r.sort((a, b) => b.score - a.score);
    }, err => console.log('home error'+err))


  }

  

}
