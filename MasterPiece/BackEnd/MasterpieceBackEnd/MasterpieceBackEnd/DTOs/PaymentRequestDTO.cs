namespace MasterpieceBackEnd.DTOs
{
    public class PaymentRequestDTO
    {
        public string? Amount { get; set; }
        public string? ProductName { get; set; }
        public string? SuccessUrl { get; set; }
        public string? CancelUrl { get; set; }
    }
}
