using System.Linq;

namespace MovieMash.Models
{
    public interface IMovieRepository
    {   
        Movie Get(int id);
        Movie Update(Movie entity);
        IQueryable<Movie> GetAll();

    }
}