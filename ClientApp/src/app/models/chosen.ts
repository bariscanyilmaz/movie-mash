import { Movie } from './movie';

export class Chosen{

    constructor(left: Movie, right: Movie) {
        this.left=left;
        this.right=right;        
    }

    left:Movie;
    right:Movie;
    
}