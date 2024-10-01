using System.ComponentModel.DataAnnotations;

namespace MasterpieceBackEnd.DTOs
{
    public class RegisterRequestDTO
    {


        [Required(ErrorMessage = "Name is required.")]
        [RegularExpression(@"^[a-zA-Z]+ [a-zA-Z]+$", ErrorMessage = "Name must be a full name (first and last name).")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Email is required.")]
        //[EmailAddress(ErrorMessage = "Invalid email format! Correct Format: example@gmail.com")]
        [RegularExpression(@"^[^\s@]+@[^\s@]+\.[^\s@]+$", ErrorMessage = "Invalid email address format! Correct Format: example@gmail.com")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Phone number is required.")]
        [RegularExpression(@"^(?:\+962|00962|962|0)?(7[5-9][0-9]{7}|6[0-9]{7})$", ErrorMessage = "Invalid Jordanian phone number.")]

        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = null!;





    }
}
