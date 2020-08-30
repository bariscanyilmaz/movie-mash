using Microsoft.EntityFrameworkCore;

namespace MovieMash.Models
{
    public class MovieDbContext:DbContext
    {
        public DbSet<Movie> Movies {get;set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)=>optionsBuilder.UseSqlite("Data Source=movie.db");

    }

}