namespace MasterpieceBackEnd.DTOs
{
    public class PathInfoResponseDTO
    {
        public int PathInfoId { get; set; }

        public string? GatheringPlace { get; set; }

        public DateTime? DepartureTime { get; set; }

        public decimal? Duration { get; set; }

        public decimal? Distance { get; set; }

        public string? RoadmapImage { get; set; }



        public PathResponseForINFODTO PathResponseDTO { get; set; }
    }


    public class PathResponseForINFODTO
    {
        public int PathId { get; set; }
        public string? PathImage { get; set; }

        public string City { get; set; } = null!;

        public string? Description { get; set; }

        public string? Difficulty { get; set; }

    }
}
