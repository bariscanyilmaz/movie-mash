using MovieMash.Models;

namespace MovieMash.Services
{
    public interface IRatingService
    {
        (Movie winner,Movie loser) Rate(Movie winner,Movie loser);
    }
}