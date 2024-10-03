namespace MasterpieceBackEnd.DTOs
{
    public class OrderHistoryDTO
    {



        public int OrderId { get; set; }

        public decimal TotalAmount { get; set; }

        public string PaymentMethod { get; set; } = null!;

        public string PaymentStatus { get; set; } = null!;

        public DateTime? PaymentDate { get; set; }

        public BookingDTO bookingDTO { get; set; }



    }

    public class BookingDTO
    {
        public int BookingId { get; set; }

        public PathDTO pathDTO { get; set; }

    }


    public class PathDTO
    {
        public string PathName { get; set; } = null!;
    }
}
