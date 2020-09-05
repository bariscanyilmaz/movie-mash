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
        public IActionResult Rate([FromBody] RateViewModel model)
        {
            try
            {
                var winner = _movieRepository.Get(model.WinnerId);
                var loser = _movieRepository.Get(model.LoserId);
                var results = _ratingService.Rate(winner, loser);

                _movieRepository.Update(results.winner);
                _movieRepository.Update(results.loser);

                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex);
            }
            
        }

    }

}