using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class PathOrder
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public int? BookingId { get; set; }

    public decimal TotalAmount { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public DateTime? PaymentDate { get; set; }

    public string? AltPhone { get; set; }

    public string? TransactionId { get; set; }

    public virtual Booking? Booking { get; set; }

    public virtual User? User { get; set; }
}
