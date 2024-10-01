namespace MasterpieceBackEnd.DTOs
{
    public class GuideApplicationRequestDTO
    {
        public string Name { get; set; } = null!;

        public int Age { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string City { get; set; } = null!;

        public string? Description { get; set; }

        public decimal RatePerHour { get; set; }

        //public DateTime? ApplicationDate { get; set; }


        public IFormFile? GuideImage { get; set; }

        public IFormFile? LicenseProof { get; set; }


        //public string? Status { get; set; }

        //public string? AdminNote { get; set; }
    }
}
