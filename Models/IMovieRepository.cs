using System;
using System.Linq;
using System.Threading.Tasks;

namespace MovieMash.Models
{
    public interface IMovieRepository:IDisposable
    {   
        Movie Get(int id);
        Task<Movie> Update(Movie entity);
        IQueryable<Movie> GetAll();


    }
}