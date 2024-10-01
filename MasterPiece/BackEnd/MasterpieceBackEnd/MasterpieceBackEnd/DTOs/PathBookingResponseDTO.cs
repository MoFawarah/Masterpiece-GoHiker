namespace MasterpieceBackEnd.DTOs
{
    public class PathBookingResponseDTO
    {
        public int BookingId { get; set; }

        public int? UserId { get; set; }

        public int? PathId { get; set; }

        public DateTime? BookingDate { get; set; }

        public int NumberOfHikers { get; set; }

        public int? CouponId { get; set; }

        public decimal TotalPrice { get; set; }

        public string? Completed { get; set; }













    }
}
