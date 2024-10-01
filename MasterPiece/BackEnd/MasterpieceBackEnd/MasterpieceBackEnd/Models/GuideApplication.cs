using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class GuideApplication
{
    public int ApplicationId { get; set; }

    public string Name { get; set; } = null!;

    public int Age { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string City { get; set; } = null!;

    public string? Description { get; set; }

    public decimal RatePerHour { get; set; }

    public DateTime? ApplicationDate { get; set; }

    public string? GuideImage { get; set; }

    public string? Status { get; set; }

    public string? AdminNote { get; set; }

    public string? LicenseProof { get; set; }
}
