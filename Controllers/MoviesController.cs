using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MovieMash.Models;
using MovieMash.Services;

namespace MovieMash.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private IMovieRepository _movieRepository;
        private IRatingService _ratingService;

        public MoviesController(IMovieRepository movieRepository, IRatingService ratingService)
        {
            _movieRepository = movieRepository;
            _ratingService = ratingService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_movieRepository.GetAll());
        }

        [HttpPost("Rate")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Rate([FromBody] RateViewModel model)
        {
            var winner = _movieRepository.Get(model.WinnerId);
            var loser = _movieRepository.Get(model.LoserId);
            var results = _ratingService.Rate(winner, loser);

            await _movieRepository.Update(results.winner);
            await _movieRepository.Update(results.loser);


            return Ok();
        }

        
    }

}