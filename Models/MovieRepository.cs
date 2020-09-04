using System.Linq;
using System.Threading.Tasks;

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
            _dbContext.Dispose();
            return movie;
        }

        public IQueryable<Movie> GetAll()
        {
            var movies=_dbContext.Movies;
            _dbContext.Dispose();
            return movies;
        }

        public async Task<Movie> Update(Movie entity)
        {
            var movie = _dbContext.Movies.SingleOrDefault(m => m.Id == entity.Id);
            if (movie != null)
            {
                movie.Score = entity.Score;
                await _dbContext.SaveChangesAsync();
            }
            _dbContext.Dispose();
            return movie;
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

       
    }
}