using System;
using System.Linq;
using System.Threading.Tasks;

namespace MovieMash.Models
{
    public interface IMovieRepository
    {   
        Movie Get(int id);
        void Update(Movie entity);
        IQueryable<Movie> GetAll();


    }
}