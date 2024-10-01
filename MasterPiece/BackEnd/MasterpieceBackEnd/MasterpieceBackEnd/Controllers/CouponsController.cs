using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public CouponsController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetCouponByCode/{couponCode}")]
        public IActionResult GetCouponByCode(string couponCode)
        {
            var coupon = _db.Coupons.Where(c => c.CouponCode == couponCode).FirstOrDefault();

            if (coupon == null)
            {
                return NotFound($"No coupon with coupon code {couponCode} found");
            }

            return Ok(coupon);


        }
    }
}
