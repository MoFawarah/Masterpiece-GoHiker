namespace MasterpieceBackEnd.DTOs
{
    public class TestimonialResponseDTO
    {
        public int? UserId { get; set; }

        public int Rating { get; set; }

        public string? Comment { get; set; }

        public UserResponseDTO userResponseDTO { get; set; }


    }

    public class UserResponseDTO
    {
        public string Name { get; set; } = null!;
        public string? City { get; set; }

        public string? ImageFileName { get; set; }

    }
}
