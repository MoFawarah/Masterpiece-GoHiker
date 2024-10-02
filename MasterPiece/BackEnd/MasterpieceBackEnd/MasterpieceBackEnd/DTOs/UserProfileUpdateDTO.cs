namespace MasterpieceBackEnd.DTOs
{
    public class UserProfileUpdateDTO
    {

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string? City { get; set; }

        public IFormFile? ImageFileName { get; set; }
    }
}
