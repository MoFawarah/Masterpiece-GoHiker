using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class PathInfo
{
    public int PathInfoId { get; set; }

    public string? GatheringPlace { get; set; }

    public DateTime? DepartureTime { get; set; }

    public decimal? Duration { get; set; }

    public decimal? Distance { get; set; }

    public string? RoadmapImage { get; set; }

    public int? PathId { get; set; }

    public virtual Path? Path { get; set; }
}
