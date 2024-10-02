using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MasterpieceBackEnd.Models;

public partial class MyDbContext : DbContext
{
    public MyDbContext()
    {
    }

    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Checkpoint> Checkpoints { get; set; }

    public virtual DbSet<Contact> Contacts { get; set; }

    public virtual DbSet<Coupon> Coupons { get; set; }

    public virtual DbSet<GuideApplication> GuideApplications { get; set; }

    public virtual DbSet<GuideBooking> GuideBookings { get; set; }

    public virtual DbSet<GuideOrder> GuideOrders { get; set; }

    public virtual DbSet<GuideReview> GuideReviews { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Path> Paths { get; set; }

    public virtual DbSet<PathInfo> PathInfos { get; set; }

    public virtual DbSet<PathOrder> PathOrders { get; set; }

    public virtual DbSet<PathReview> PathReviews { get; set; }

    public virtual DbSet<PopularDestination> PopularDestinations { get; set; }

    public virtual DbSet<TourGuide> TourGuides { get; set; }

    public virtual DbSet<TripDesign> TripDesigns { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-2D4DL9L;Database=MasterPiece;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admins__719FE488048E4B42");

            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Role).HasMaxLength(50);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId).HasName("PK__Bookings__73951AED5CE47AA7");

            entity.Property(e => e.BookingDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Completed)
                .HasMaxLength(4)
                .HasDefaultValue("No");
            entity.Property(e => e.TotalPrice).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Coupon).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.CouponId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK__Bookings__Coupon__49C3F6B7");

            entity.HasOne(d => d.Path).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.PathId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Bookings__PathId__47DBAE45");

            entity.HasOne(d => d.User).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Bookings__UserId__46E78A0C");
        });

        modelBuilder.Entity<Checkpoint>(entity =>
        {
            entity.HasKey(e => e.CheckpointId).HasName("PK__Checkpoi__6C00DFE2E986C744");

            entity.Property(e => e.CheckpointName).HasMaxLength(100);

            entity.HasOne(d => d.Path).WithMany(p => p.Checkpoints)
                .HasForeignKey(d => d.PathId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Checkpoin__PathI__7C4F7684");
        });

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.ContactId).HasName("PK__Contact__5C66259BBEDE4E37");

            entity.ToTable("Contact");

            entity.Property(e => e.AdminResponseDate).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasDefaultValue("Pending");
            entity.Property(e => e.Subject).HasMaxLength(255);
            entity.Property(e => e.SubmissionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.CouponId).HasName("PK__Coupons__384AF1BA368CF651");

            entity.HasIndex(e => e.CouponCode, "UQ__Coupons__D34908002963ADB6").IsUnique();

            entity.Property(e => e.CouponCode).HasMaxLength(50);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DiscountPercentage).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.UsedCount).HasDefaultValue(0);
        });

        modelBuilder.Entity<GuideApplication>(entity =>
        {
            entity.HasKey(e => e.ApplicationId).HasName("PK__GuideApp__C93A4C99C484CCB0");

            entity.Property(e => e.ApplicationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.GuideImage).HasDefaultValue("default-guideImage.jpg");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.RatePerHour).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
        });

        modelBuilder.Entity<GuideBooking>(entity =>
        {
            entity.HasKey(e => e.GuideBookingId).HasName("PK__GuideBoo__5E8FCD2FB7F6FED5");

            entity.Property(e => e.BookingDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.EndTime).HasColumnType("datetime");
            entity.Property(e => e.RatePerHour).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.StartTime).HasColumnType("datetime");
            entity.Property(e => e.TotalPrice)
                .HasComputedColumnSql("(datediff(hour,[StartTime],[EndTime])*[RatePerHour])", false)
                .HasColumnType("decimal(21, 2)");

            entity.HasOne(d => d.Guide).WithMany(p => p.GuideBookings)
                .HasForeignKey(d => d.GuideId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GuideBook__Guide__5DCAEF64");

            entity.HasOne(d => d.User).WithMany(p => p.GuideBookings)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GuideBook__UserI__5CD6CB2B");
        });

        modelBuilder.Entity<GuideOrder>(entity =>
        {
            entity.HasKey(e => e.GuideOrderId).HasName("PK__GuideOrd__BD242A69605726E0");

            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.PaymentStatus).HasMaxLength(20);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.GuideBooking).WithMany(p => p.GuideOrders)
                .HasForeignKey(d => d.GuideBookingId)
                .HasConstraintName("FK__GuideOrde__Guide__0D7A0286");

            entity.HasOne(d => d.User).WithMany(p => p.GuideOrders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GuideOrde__UserI__0C85DE4D");
        });

        modelBuilder.Entity<GuideReview>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__GuideRev__74BC79CEFB642EED");

            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");

            entity.HasOne(d => d.Guide).WithMany(p => p.GuideReviews)
                .HasForeignKey(d => d.GuideId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GuideRevi__Guide__68487DD7");

            entity.HasOne(d => d.User).WithMany(p => p.GuideReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__GuideRevi__UserI__6754599E");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E12A1D2BB4D");

            entity.Property(e => e.IsRead).HasDefaultValue(false);
            entity.Property(e => e.NotificationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Notificat__UserI__6D0D32F4");
        });

        modelBuilder.Entity<Path>(entity =>
        {
            entity.HasKey(e => e.PathId).HasName("PK__Paths__CD67DC59D0F0AC5F");

            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Difficulty).HasMaxLength(50);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.PathImage).HasDefaultValue("default-pathImage.jpg");
            entity.Property(e => e.PathName).HasMaxLength(100);
            entity.Property(e => e.PricePerPerson).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasDefaultValue("Active");
        });

        modelBuilder.Entity<PathInfo>(entity =>
        {
            entity.HasKey(e => e.PathInfoId).HasName("PK__PathInfo__FA95894F9CCFEDDC");

            entity.ToTable("PathInfo");

            entity.HasIndex(e => e.PathId, "UQ__PathInfo__CD67DC58756E1772").IsUnique();

            entity.Property(e => e.DepartureTime).HasColumnType("datetime");
            entity.Property(e => e.Distance).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Duration).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.GatheringPlace).HasMaxLength(255);

            entity.HasOne(d => d.Path).WithOne(p => p.PathInfo)
                .HasForeignKey<PathInfo>(d => d.PathId)
                .HasConstraintName("FK_PathInfo_Path");
        });

        modelBuilder.Entity<PathOrder>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__PathOrde__C3905BCF79033C38");

            entity.Property(e => e.AltPhone)
                .HasMaxLength(50)
                .HasColumnName("altPhone");
            entity.Property(e => e.InvoceImg).HasColumnName("invoceImg");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50);
            entity.Property(e => e.PaymentStatus).HasMaxLength(20);
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(50)
                .HasColumnName("transactionId");

            entity.HasOne(d => d.Booking).WithMany(p => p.PathOrders)
                .HasForeignKey(d => d.BookingId)
                .HasConstraintName("FK__PathOrder__Booki__07C12930");

            entity.HasOne(d => d.User).WithMany(p => p.PathOrders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__PathOrder__UserI__06CD04F7");
        });

        modelBuilder.Entity<PathReview>(entity =>
        {
            entity.HasKey(e => e.ReviewId).HasName("PK__PathRevi__74BC79CEFCD38972");

            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Path).WithMany(p => p.PathReviews)
                .HasForeignKey(d => d.PathId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__PathRevie__PathI__628FA481");

            entity.HasOne(d => d.User).WithMany(p => p.PathReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__PathRevie__UserI__619B8048");
        });

        modelBuilder.Entity<PopularDestination>(entity =>
        {
            entity.HasKey(e => e.DestinationId).HasName("PK__PopularD__DB5FE4CC5B7621D3");

            entity.Property(e => e.Author).HasMaxLength(100);
            entity.Property(e => e.DestinationName).HasMaxLength(255);
            entity.Property(e => e.Image).HasDefaultValue("default-destination.jpg");
            entity.Property(e => e.PostDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<TourGuide>(entity =>
        {
            entity.HasKey(e => e.GuideId).HasName("PK__TourGuid__E77EE05EFE4C1E22");

            entity.Property(e => e.Approved).HasDefaultValue(false);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.GuideImage).HasDefaultValue("default-guideImage.jpg");
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.RatePerHour).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<TripDesign>(entity =>
        {
            entity.HasKey(e => e.TripDesignId).HasName("PK__TripDesi__1B810036307C8099");

            entity.Property(e => e.AmountPaid)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Budget).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(15);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
            entity.Property(e => e.SubmissionDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.User).WithMany(p => p.TripDesigns)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__TripDesig__UserI__3493CFA7");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CFFD12B0D");

            entity.HasIndex(e => e.Email, "UQ_Email_Users").IsUnique();

            entity.HasIndex(e => e.PhoneNumber, "UQ_PhoneNumber_Users").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D10534EFE72492").IsUnique();

            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasDefaultValue("Not specified yet");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.ImageFileName).HasDefaultValue("default-profile.jpg");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.Points).HasDefaultValue(0);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
