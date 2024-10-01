namespace MasterpieceBackEnd.DTOs
{
    public class TripDesignResponseDTO
    {

        public int TripDesignId { get; set; }

        public int? UserId { get; set; }

        public string? Name { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string City { get; set; } = null!;

        public int NumberOfHikers { get; set; }

        public decimal Budget { get; set; }

        public string? Message { get; set; }

        public DateTime? SubmissionDate { get; set; }

        public string? Status { get; set; }

        public string? AdminNote { get; set; }

        public decimal? AmountPaid { get; set; }


    }
}
