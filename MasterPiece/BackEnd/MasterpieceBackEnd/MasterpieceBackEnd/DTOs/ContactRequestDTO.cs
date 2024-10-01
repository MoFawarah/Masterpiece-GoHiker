namespace MasterpieceBackEnd.DTOs
{
    public class ContactRequestDTO
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? PhoneNumber { get; set; }

        public string? Subject { get; set; }

        public string Message { get; set; } = null!;


    }
}
