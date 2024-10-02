namespace MasterpieceBackEnd.DTOs
{
    public class UserProfileResponseDTO
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string? City { get; set; }

        public string? ImageFileName { get; set; }


    }
}
