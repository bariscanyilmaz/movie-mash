import { Movie } from './movie';

export class RateViewModel {

    constructor(winner: Movie, loser: Movie) {
        this.winnerId = winner.id;
        this.winnerName = winner.name;

        this.loserId = loser.id;
        this.loserName = loser.name;
    }

    winnerId: number;
    winnerName: string;

    loserId: number;
    loserName: string;
}
