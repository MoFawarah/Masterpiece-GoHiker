namespace MasterpieceBackEnd.DTOs
{
    public class PathInfoRequestDTO
    {
        public string? GatheringPlace { get; set; }

        public DateTime? DepartureTime { get; set; }

        public decimal? Duration { get; set; }

        public decimal? Distance { get; set; }

        public IFormFile? RoadmapImage { get; set; }

        public int? PathId { get; set; }

    }
}
