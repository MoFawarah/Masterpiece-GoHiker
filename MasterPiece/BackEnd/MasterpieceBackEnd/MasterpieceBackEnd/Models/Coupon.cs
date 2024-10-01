using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Coupon
{
    public int CouponId { get; set; }

    public string CouponCode { get; set; } = null!;

    public decimal DiscountPercentage { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool? IsActive { get; set; }

    public int? MaxUses { get; set; }

    public int? UsedCount { get; set; }

    public DateTime? CreatedDate { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
