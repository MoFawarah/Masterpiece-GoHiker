using System;
using System.Collections.Generic;

namespace MasterpieceBackEnd.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string? City { get; set; }

    public string? ImageFileName { get; set; }

    public int? Points { get; set; }

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual ICollection<GuideBooking> GuideBookings { get; set; } = new List<GuideBooking>();

    public virtual ICollection<GuideOrder> GuideOrders { get; set; } = new List<GuideOrder>();

    public virtual ICollection<GuideReview> GuideReviews { get; set; } = new List<GuideReview>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<PathOrder> PathOrders { get; set; } = new List<PathOrder>();

    public virtual ICollection<PathReview> PathReviews { get; set; } = new List<PathReview>();

    public virtual ICollection<TripDesign> TripDesigns { get; set; } = new List<TripDesign>();
}
