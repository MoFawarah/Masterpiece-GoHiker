using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int? UserId { get; set; }

    public int? PathId { get; set; }

    public DateTime? BookingDate { get; set; }

    public int NumberOfHikers { get; set; }

    public int? CouponId { get; set; }

    public decimal TotalPrice { get; set; }

    public string? Completed { get; set; }

    public virtual Coupon? Coupon { get; set; }

    public virtual Path? Path { get; set; }

    public virtual ICollection<PathOrder> PathOrders { get; set; } = new List<PathOrder>();

    public virtual User? User { get; set; }
}
