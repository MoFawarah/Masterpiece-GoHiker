namespace MasterpieceBackEnd.DTOs
{
    public class PathOrderRequestDTO
    {
        public int? UserId { get; set; }

        public int? BookingId { get; set; }

        public decimal TotalAmount { get; set; }

        public string PaymentMethod { get; set; } = null!;

        public string PaymentStatus { get; set; } = null!;

        public DateTime? PaymentDate { get; set; }
        public string? AltPhone { get; set; }
        public string? TransactionId { get; set; }

        public IFormFile? InvoceImg { get; set; }



    }
}
