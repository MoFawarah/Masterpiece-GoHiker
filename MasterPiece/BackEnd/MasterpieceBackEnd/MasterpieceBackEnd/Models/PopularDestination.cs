using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class PopularDestination
{
    public int DestinationId { get; set; }

    public string DestinationName { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string? Image { get; set; }

    public DateTime? PostDate { get; set; }

    public string? Author { get; set; }
}
