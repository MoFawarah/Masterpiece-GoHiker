namespace MasterpieceBackEnd.DTOs
{
    public class GuideRequestDTO
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? GuideImage { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public int Age { get; set; }

        public string City { get; set; } = null!;

        public string? Description { get; set; }

        public decimal RatePerHour { get; set; }

        public bool? Approved { get; set; }

    }
}
