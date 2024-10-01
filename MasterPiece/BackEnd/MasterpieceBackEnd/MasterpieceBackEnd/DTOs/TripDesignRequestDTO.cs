namespace MasterpieceBackEnd.DTOs
{
    public class TripDesignRequestDTO
    {

        public int? UserId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string City { get; set; } = null!;

        public int NumberOfHikers { get; set; }

        public decimal Budget { get; set; }

        public string? Message { get; set; }





    }
}
