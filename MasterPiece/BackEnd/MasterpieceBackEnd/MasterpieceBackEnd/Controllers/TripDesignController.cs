using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripDesignController : ControllerBase
    {
        private readonly MyDbContext _db;

        public TripDesignController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAllTripDesignBookings")]
        public IActionResult GetAllTripDesignBookings([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.TripDesigns.Count();

            var tripDesigns = _db.TripDesigns
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .Select(TD => new TripDesignResponseDTO
                            {
                                TripDesignId = TD.TripDesignId,
                                UserId = TD.UserId,
                                Name = TD.Name,
                                Email = TD.Email,
                                Phone = TD.Phone,
                                City = TD.City,
                                NumberOfHikers = TD.NumberOfHikers,
                                Budget = TD.Budget,
                                Message = TD.Message,
                                SubmissionDate = TD.SubmissionDate,
                                Status = TD.Status,
                                AdminNote = TD.AdminNote,
                                AmountPaid = TD.AmountPaid,

                            }).ToList();


            if (!tripDesigns.Any())
            {
                return NotFound("No Trip Designs Found");
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = tripDesigns
            });
        }



        [HttpPost("CreateTripDesign")]
        public IActionResult CreateTripDesign([FromForm] TripDesignRequestDTO tripDesignDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newTripDesign = new TripDesign
            {

                UserId = tripDesignDTO.UserId,
                Name = tripDesignDTO.Name,
                Email = tripDesignDTO.Email,
                Phone = tripDesignDTO.Phone,
                City = tripDesignDTO.City,
                NumberOfHikers = tripDesignDTO.NumberOfHikers,
                Budget = tripDesignDTO.Budget,
                Message = tripDesignDTO.Message,

            };


            if (tripDesignDTO.UserId != null)
            {
                var user = _db.Users.FirstOrDefault(u => u.UserId == newTripDesign.UserId);
                if (user == null)
                {
                    return BadRequest($"No user with Id {tripDesignDTO.UserId} found");
                }
            }

            _db.TripDesigns.Add(newTripDesign);
            _db.SaveChanges();

            return Ok();
        }



        [HttpPut("UpdateTripDesign/{id}")]
        public IActionResult UpdateTripDesign(int id, [FromForm] TripDesignUpdateRequestDTO tripDesignDTO)

        {

            var t = _db.TripDesigns.FirstOrDefault(p => p.TripDesignId == id);





            if (t == null)
            {
                return NotFound("Path not found");
            }


            t.Status = tripDesignDTO.Status;
            t.AdminNote = tripDesignDTO.AdminNote;
            t.AmountPaid = tripDesignDTO.AmountPaid;





            _db.TripDesigns.Update(t);
            _db.SaveChanges();


            return Ok();
        }





    }
}
