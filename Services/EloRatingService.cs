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

            double winnerProbibility = Probibility((float)winner.Score, (float)loser.Score);
            double loserPobibiliy = 1 - winnerProbibility;

            winner.Score += K * (1 - winnerProbibility);
            loser.Score += K * (0 - loserPobibiliy);

            return (winner: winner, loser: loser);

        }

        private double Probibility(float winnerScore, float loserScore)
        {
            //return pobibility of winner player
            //return 1.0f/(1+Math.Pow(10,((loserScore-winnerScore)/400)));           

            return 1.0f / (1 + 1.0f *
                   (Math.Pow(10, 1.0f *
                     (loserScore - winnerScore) / 400)));
                     
        }
    }
}