using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Admin
{
    public int AdminId { get; set; }

    public string Role { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public string Password { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;
}
