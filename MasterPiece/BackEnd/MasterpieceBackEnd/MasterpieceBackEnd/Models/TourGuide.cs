using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class TourGuide
{
    public int GuideId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? GuideImage { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public int Age { get; set; }

    public string City { get; set; } = null!;

    public string? Description { get; set; }

    public decimal RatePerHour { get; set; }

    public bool? Approved { get; set; }

    public virtual ICollection<GuideBooking> GuideBookings { get; set; } = new List<GuideBooking>();

    public virtual ICollection<GuideReview> GuideReviews { get; set; } = new List<GuideReview>();
}
