namespace MasterpieceBackEnd.DTOs
{
    public class PathOrderResponseDTO
    {
        public int OrderId { get; set; }

        public int? UserId { get; set; }

        public int? BookingId { get; set; }

        public decimal TotalAmount { get; set; }

        public string PaymentMethod { get; set; } = null!;

        public string PaymentStatus { get; set; } = null!;

        public DateTime? PaymentDate { get; set; }

        public string? AltPhone { get; set; }


    }
}
