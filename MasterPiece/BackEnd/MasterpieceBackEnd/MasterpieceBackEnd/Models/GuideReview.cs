using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class GuideReview
{
    public int ReviewId { get; set; }

    public int? UserId { get; set; }

    public int? GuideId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? ReviewDate { get; set; }

    public string? Status { get; set; }

    public virtual TourGuide? Guide { get; set; }

    public virtual User? User { get; set; }
}
