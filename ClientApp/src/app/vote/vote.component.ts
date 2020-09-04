import { Component, OnInit, HostListener } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';
import { Chosen } from "../models/chosen";
import { RateViewModel } from '../models/rateViewModel';
import { k_combinations, combinations } from "../utility";
import { Router } from '@angular/router';


@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {


  combinations:Movie[][];
  chosen:Chosen;

  constructor(private movieService: MovieService,private router:Router) {

  }

  ngOnInit(): void {
    this.movieService.getAll().subscribe(res => {
      
      this.combinations =(k_combinations(res, 2).shuffle());

    }, err => console.error(err), () => {
      this.nextVote();
    });


  }

  nextVote() {
    if (this.combinations.length > 0) {
      let comb=this.combinations.shift();
      this.chosen=(new Chosen(comb.shift(),comb.shift()));
    } else {

      this.chosen = null;
      this.router.navigate(['/home']);
    }

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.keyCode == 37) {
      this.choose(true)
    }else if(event.keyCode==39){
      this.choose(false);
    }

  }

  choose(isLeft: boolean) {
    let rate: RateViewModel;
    if (isLeft) {
      rate = new RateViewModel(this.chosen.left, this.chosen.right);
    } else {
      rate = new RateViewModel(this.chosen.right, this.chosen.left);
    }

    this.movieService.rate(rate).subscribe((res) => {
      
    }, (err) => console.log(err));
    this.nextVote();

  }





}
