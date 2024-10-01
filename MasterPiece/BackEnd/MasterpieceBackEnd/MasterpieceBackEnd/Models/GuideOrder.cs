using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class GuideOrder
{
    public int GuideOrderId { get; set; }

    public int? UserId { get; set; }

    public int? GuideBookingId { get; set; }

    public decimal TotalAmount { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string PaymentStatus { get; set; } = null!;

    public DateTime? PaymentDate { get; set; }

    public virtual GuideBooking? GuideBooking { get; set; }

    public virtual User? User { get; set; }
}
