using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class GuideBooking
{
    public int GuideBookingId { get; set; }

    public int? UserId { get; set; }

    public int? GuideId { get; set; }

    public DateTime? BookingDate { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public decimal RatePerHour { get; set; }

    public decimal? TotalPrice { get; set; }

    public virtual TourGuide? Guide { get; set; }

    public virtual ICollection<GuideOrder> GuideOrders { get; set; } = new List<GuideOrder>();

    public virtual User? User { get; set; }
}
