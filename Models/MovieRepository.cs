using System.Linq;

namespace MovieMash.Models
{
    public class MovieRepository : IMovieRepository
    {
        private readonly MovieDbContext _dbContext;
        public MovieRepository(MovieDbContext dbContext)
        {
            _dbContext=dbContext;
        }
        public Movie Get(int id)
        {
            return _dbContext.Movies.SingleOrDefault(m=>m.Id==id);
        }

        public IQueryable<Movie> GetAll()
        {
            return _dbContext.Movies;
        }

        public Movie Update(Movie entity)
        {
            var movie= _dbContext.Movies.SingleOrDefault(m=>m.Id==entity.Id);
            if (movie!=null)
            {
                movie.Score=entity.Score;
                _dbContext.SaveChanges();
            }
            return movie;
        }
    }
}