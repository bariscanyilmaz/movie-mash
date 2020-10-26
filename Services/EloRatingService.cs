using System;
using MovieMash.Models;

namespace MovieMash.Services
{
    public class EloRatingService : IRatingService
    {
        private const int K = 100;
        private IMovieRepository _movieRepository;

        public EloRatingService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public (Movie winner, Movie loser) Rate(Movie winner, Movie loser)
        {

            double winnerProbibility = Probibility(winner.Score, loser.Score);
            double loserPobibiliy = 1 - winnerProbibility;

            winner.Score += K * (1 - winnerProbibility);
            loser.Score += K * (0 - loserPobibiliy);

            return (winner: winner, loser: loser);

        }

        private double Probibility(double winnerScore, double loserScore)
        {
 
            return 1.0d / (1 + 1.0d *
                   (Math.Pow(10, 1.0d *
                     (loserScore - winnerScore) / 400)));
                     
        }
    }
}