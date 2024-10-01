using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Path
{
    public int PathId { get; set; }

    public string PathName { get; set; } = null!;

    public string? PathImage { get; set; }

    public string City { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string? Difficulty { get; set; }

    public int Capacity { get; set; }

    public decimal PricePerPerson { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string Status { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<Checkpoint> Checkpoints { get; set; } = new List<Checkpoint>();

    public virtual PathInfo? PathInfo { get; set; }

    public virtual ICollection<PathReview> PathReviews { get; set; } = new List<PathReview>();
}
