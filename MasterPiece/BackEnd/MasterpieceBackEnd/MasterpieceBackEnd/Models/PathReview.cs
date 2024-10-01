using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class PathReview
{
    public int ReviewId { get; set; }

    public int? UserId { get; set; }

    public int? PathId { get; set; }

    public int Rating { get; set; }

    public string? Comment { get; set; }

    public DateTime? ReviewDate { get; set; }

    public virtual Path? Path { get; set; }

    public virtual User? User { get; set; }
}
