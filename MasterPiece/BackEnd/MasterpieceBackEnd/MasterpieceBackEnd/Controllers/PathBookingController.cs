using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathBookingController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PathBookingController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPathBooking")]
        public IActionResult GetAllPathBooking([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.Bookings.Count();
            var pathOrders = _db.Bookings.Skip((page - 1) * pageSize)
                           .Take(pageSize)
                           .Select(p => new PathBookingResponseDTO
                           {
                               BookingId = p.BookingId,
                               UserId = p.UserId,
                               PathId = p.PathId,
                               BookingDate = p.BookingDate,
                               NumberOfHikers = p.NumberOfHikers,
                               CouponId = p.CouponId,
                               TotalPrice = p.TotalPrice,
                               Completed = p.Completed,

                           }).ToList();

            if (!pathOrders.Any())
            {
                return NotFound("No path bookings found");
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = pathOrders
            });

        }



        [HttpPost("CreateNewBooking")]
        public IActionResult CreateNewBooking([FromForm] PathBookingRequestDTO BookingDTO)
        {


            var newBooking = new Booking
            {
                UserId = BookingDTO.UserId,
                PathId = BookingDTO.PathId,
                NumberOfHikers = BookingDTO.NumberOfHikers,
                CouponId = BookingDTO.CouponId,
                TotalPrice = BookingDTO.TotalPrice,

            };




            _db.Bookings.Add(newBooking);
            _db.SaveChanges();


            return Ok(newBooking);
        }
    }
}
