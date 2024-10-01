using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Checkpoint
{
    public int CheckpointId { get; set; }

    public int? PathId { get; set; }

    public string CheckpointName { get; set; } = null!;

    public string CheckpointDescription { get; set; } = null!;

    public int CheckpointOrder { get; set; }

    public virtual Path? Path { get; set; }
}
