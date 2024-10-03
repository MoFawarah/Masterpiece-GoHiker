using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {


        private readonly MyDbContext _db;


        public PaymentController(MyDbContext db)
        {
            _db = db;

            StripeConfiguration.ApiKey = "sk_test_51Q3FzBRqxwpgnuaX7azGSStPP6UpFrrMOYsg51jX6Tkoj2M4q95UWWxkWvy8DuIdyVcav2EOZxtXf5O5wMhWDxQC003Xx9VDhk";
        }

        [HttpPost("create-checkout-session")]
        public ActionResult CreateCheckoutSession([FromBody] PaymentRequestDTO paymentRequest)
        {
            try
            {
                // Validate amount
                if (string.IsNullOrWhiteSpace(paymentRequest.Amount) || !long.TryParse(paymentRequest.Amount, out var parsedAmount))
                {
                    return BadRequest("Invalid or missing amount.");
                }

                var options = new SessionCreateOptions
                {
                    PaymentMethodTypes = new List<string> { "card" },
                    LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        Currency = "usd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = paymentRequest.ProductName ?? "Unknown Product", // Default to avoid null
                        },
                        UnitAmount = parsedAmount // Use validated amount
                    },
                    Quantity = 1,
                },
            },
                    Mode = "payment",
                    SuccessUrl = paymentRequest.SuccessUrl ?? "https://example.com/success",
                    CancelUrl = paymentRequest.CancelUrl ?? "https://example.com/cancel",
                };

                var service = new SessionService();
                Session session = service.Create(options);

                return Ok(new { sessionId = session.Id });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error creating checkout session: {ex.Message}");
                return BadRequest($"Error creating checkout session: {ex.Message}");
            }
        }


        [HttpGet("get-checkout-session/{sessionId}")]
        public async Task<IActionResult> GetCheckoutSession(string sessionId)
        {
            var service = new SessionService();
            var session = await service.GetAsync(sessionId);

            // Return the session details including payment_intent (transaction ID)
            return Ok(new { payment_intent = session.PaymentIntentId });
        }









    }
}
