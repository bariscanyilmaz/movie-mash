using System.Linq;

namespace MovieMash.Models
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MovieDbContext _dbContext;
        

        public MovieRepository(MovieDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Movie Get(int id)
        {
            var movie=_dbContext.Movies.SingleOrDefault(m => m.Id == id);
            
            return movie;
        }

        public IQueryable<Movie> GetAll()
        {
            var movies=_dbContext.Movies;
            return movies;
        }

        public Movie Update(Movie entity)
        {
            var movie = _dbContext.Movies.SingleOrDefault(m => m.Id == entity.Id);
            if (movie != null)
            {
                movie.Score = entity.Score;
                _dbContext.SaveChanges();
            }
            return movie;
        }

        

       
    }
}