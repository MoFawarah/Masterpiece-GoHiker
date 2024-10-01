using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathReviewController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PathReviewController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPathReviews")]
        public IActionResult GetAllPathReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.PathReviews.Count();
            var pathReviews = _db.PathReviews
                             .Skip((page - 1) * pageSize)
                             .Take(pageSize).ToList();

            if (!pathReviews.Any())
            {
                return NotFound("No path reviews yet");

            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = pathReviews
            });

        }


        [HttpGet("GetAllPathReviewsNoPagination")]
        public IActionResult GetPathReviews()
        {
            var totalItems = _db.PathReviews.Count();
            var pathReviews = _db.PathReviews.ToList();



            if (!pathReviews.Any())
            {
                return NotFound("No path reviews yet");

            }

            return Ok(pathReviews);

        }

        [HttpGet("Testmonail")]
        public IActionResult Testmonail()
        {
            var reviews = _db.PathReviews.Select(PR => new TestimonialResponseDTO
            {
                UserId = PR.UserId,
                Rating = PR.Rating,
                Comment = PR.Comment,
                userResponseDTO = new UserResponseDTO
                {
                    Name = PR.User.Name,
                    City = PR.User.City,
                    ImageFileName = PR.User.ImageFileName,
                }

            });



            if (!reviews.Any())
            {
                return NotFound("No path reviews yet");

            }

            return Ok(reviews);

        }


        [HttpPost("CreatePathReview")]
        public IActionResult CreatePathReview([FromForm] PathReviewRequestDTO reviewDTO)
        {


            var newPathReview = new PathReview
            {
                UserId = reviewDTO.UserId,
                PathId = reviewDTO.PathId,
                Rating = reviewDTO.Rating,
                Comment = reviewDTO.Comment,

            };

            _db.PathReviews.Add(newPathReview);
            _db.SaveChanges();

            return Ok(newPathReview);
        }

        [HttpGet("GetPathReviewByPathId/{pathId}")]
        public IActionResult GetActivePathReviews(int pathId)
        {

            var pathReview = _db.PathReviews.Where(pr => pr.PathId == pathId).ToList();

            double ratingSum = 0;
            double ratings = 0;
            double ratingAvg = 0;
            foreach (var item in pathReview)
            {
                ratingSum += item.Rating;
                ratings++;

            }
            ratingAvg = ratingSum / ratings;



            return Ok(new
            {
                rating = ratings,
                ratingAvg = ratingAvg,
            });
        }

        [HttpDelete("DeletePathReviewById/{Id}")]
        public IActionResult DeletePathReviewById(int Id)
        {

            var pathReview = _db.PathReviews.Where(pr => pr.ReviewId == Id).FirstOrDefault();
            if (pathReview == null)
            {
                return NotFound($"No Review found for id {Id}");

            }
            _db.PathReviews.Remove(pathReview);
            _db.SaveChanges();

            return Ok("Review Deleted");
        }
    }
}
