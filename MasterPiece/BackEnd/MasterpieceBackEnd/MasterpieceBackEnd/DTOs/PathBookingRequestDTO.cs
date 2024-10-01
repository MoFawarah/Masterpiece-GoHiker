namespace MasterpieceBackEnd.DTOs
{
    public class PathBookingRequestDTO
    {

        public int? UserId { get; set; }

        public int? PathId { get; set; }

        public int NumberOfHikers { get; set; }

        public int? CouponId { get; set; }

        public decimal TotalPrice { get; set; }




    }
}
