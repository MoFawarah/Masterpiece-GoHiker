using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathOrderController : ControllerBase
    {

        private readonly MyDbContext _db;

        public PathOrderController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPAthOrders")]
        public IActionResult GetAllPAthOrders([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.PathOrders.Count();

            var pathOrders = _db.PathOrders
                           .Skip((page - 1) * pageSize)
                           .Take(pageSize)
                           .Select(PO => new PathOrderResponseDTO
                           {
                               OrderId = PO.OrderId,
                               UserId = PO.UserId,
                               BookingId = PO.BookingId,
                               TotalAmount = PO.TotalAmount,
                               PaymentMethod = PO.PaymentMethod,
                               PaymentStatus = PO.PaymentStatus,
                               PaymentDate = PO.PaymentDate,
                               AltPhone = PO.AltPhone,



                           }).ToList();


            if (!pathOrders.Any())
            {
                return NotFound("No Path Orders Yet");
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = pathOrders
            });
        }


        [HttpPost("CreateNewPathOrder")]

        public IActionResult CreateNewPathOrder([FromForm] PathOrderRequestDTO orderDTO)
        {

            var newPathOrder = new PathOrder
            {
                UserId = orderDTO.UserId,
                BookingId = orderDTO.BookingId,
                TotalAmount = orderDTO.TotalAmount,
                PaymentMethod = orderDTO.PaymentMethod,
                PaymentStatus = orderDTO.PaymentStatus,
                PaymentDate = orderDTO.PaymentDate,
                AltPhone = orderDTO.AltPhone,
                TransactionId = orderDTO.TransactionId,

            };

            _db.PathOrders.Add(newPathOrder);
            _db.SaveChanges();


            var pathBooking = _db.Bookings.Where(b => b.BookingId == newPathOrder.BookingId).FirstOrDefault();

            pathBooking.Completed = "Yes";
            _db.Bookings.Update(pathBooking);
            _db.SaveChanges();


            var response = new
            {
                newPathOrder.OrderId,
                newPathOrder.UserId,
                newPathOrder.BookingId,
                newPathOrder.TotalAmount,
                newPathOrder.PaymentMethod,
                newPathOrder.PaymentStatus,
                newPathOrder.PaymentDate,
                BookingCompleted = pathBooking.Completed,
                newPathOrder.AltPhone,

            };




            return Ok(response);
        }
    }
}
