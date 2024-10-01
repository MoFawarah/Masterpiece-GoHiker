namespace MasterpieceBackEnd.DTOs
{
    public class PathRequestDTO
    {

        public string PathName { get; set; } = null!;

        public IFormFile? PathImage { get; set; }

        public string City { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Difficulty { get; set; }

        public int Capacity { get; set; }

        public decimal PricePerPerson { get; set; }

        public string Status { get; set; } = null!;



    }
}
