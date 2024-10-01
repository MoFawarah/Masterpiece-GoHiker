using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class Contact
{
    public int ContactId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string? Subject { get; set; }

    public string Message { get; set; } = null!;

    public DateTime? SubmissionDate { get; set; }

    public string? Status { get; set; }

    public string? AdminResponse { get; set; }

    public DateTime? AdminResponseDate { get; set; }
}
