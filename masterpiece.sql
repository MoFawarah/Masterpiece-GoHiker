-- Table: Users
create database MasterPiece
use MasterPiece
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Password NVARCHAR(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PhoneNumber NVARCHAR(50) NULL,
    City NVARCHAR(50) NULL,
    ImageFileName NVARCHAR(MAX) DEFAULT 'default-profile.jpg', -- Default profile image file name
    Points INT NULL default 0
);

-- Table: Coupons
CREATE TABLE Coupons (
    CouponId INT PRIMARY KEY IDENTITY,
    CouponCode NVARCHAR(50) NOT NULL UNIQUE,
    DiscountPercentage DECIMAL(5, 2) NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    IsActive BIT DEFAULT 1,
    MaxUses INT NULL,
    UsedCount INT DEFAULT 0,
    CreatedDate DATETIME DEFAULT GETDATE()
);

-- Table: Paths
CREATE TABLE Paths (
    PathId INT PRIMARY KEY IDENTITY,
    PathName NVARCHAR(100) NOT NULL,
    PathImage NVARCHAR(MAX) DEFAULT 'default-pathImage.jpg',
    City NVARCHAR(50) NOT NULL,
    Description NVARCHAR(MAX),
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    Difficulty NVARCHAR(50) CHECK (Difficulty IN ('Easy', 'Medium', 'Hard')) NULL,
    Capacity INT NOT NULL,
    PricePerPerson DECIMAL(10, 2) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE()
);

-- Table: Bookings
CREATE TABLE Bookings (
    BookingId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    PathId INT FOREIGN KEY REFERENCES Paths(PathId) ON DELETE CASCADE ON UPDATE CASCADE,
    BookingDate DATETIME DEFAULT GETDATE(),
    NumberOfHikers INT NOT NULL,
    CouponId INT NULL FOREIGN KEY REFERENCES Coupons(CouponId) ON DELETE SET NULL ON UPDATE CASCADE,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    --PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) NOT NULL
);

-- Table: TripDesigns// Old
CREATE TABLE TripDesigns (
    TripDesignId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    City NVARCHAR(50) NOT NULL,
    NumberOfHikers INT NOT NULL,
    BudgetPerPerson DECIMAL(10, 2) NOT NULL,
    Message NVARCHAR(MAX),
    SubmissionDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    AdminNote NVARCHAR(MAX)
);

drop table TripDesigns
-- Table: TripDesigns// New

CREATE TABLE TripDesigns (
    TripDesignId INT PRIMARY KEY IDENTITY,
    UserId INT NULL FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE, -- Nullable for non-logged-in users
    Name NVARCHAR(100), -- For non-logged-in users to enter their name
    Email NVARCHAR(100), -- For non-logged-in users to enter their email
    Phone NVARCHAR(15), -- For non-logged-in users to enter their phone number
    City NVARCHAR(50) NOT NULL,
    NumberOfHikers INT NOT NULL,
    Budget DECIMAL(10, 2) NOT NULL,
    Message NVARCHAR(MAX),
    SubmissionDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    AdminNote NVARCHAR(MAX)
);

ALTER TABLE TripDesigns
ADD AmountPaid DECIMAL(10, 2) DEFAULT 0;

-- Table: Tour Guides
CREATE TABLE TourGuides (
    GuideId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
	Email NVARCHAR(100) NOT NULL,
    GuideImage NVARCHAR(MAX) DEFAULT 'default-guideImage.jpg',
	PhoneNumber NVARCHAR(50) NOT NULL,
    Age INT NOT NULL,
    City NVARCHAR(50) NOT NULL,
    Description NVARCHAR(MAX),
    RatePerHour DECIMAL(10, 2) NOT NULL,
    Approved BIT DEFAULT 0
);
CREATE TABLE GuideApplications (
    ApplicationId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Age INT NOT NULL,
    PhoneNumber NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    City NVARCHAR(50) NOT NULL,
    Description NVARCHAR(MAX),
    RatePerHour DECIMAL(10, 2) NOT NULL,
    ApplicationDate DATETIME DEFAULT GETDATE(),
    GuideImage NVARCHAR(MAX) DEFAULT 'default-guideImage.jpg',
    Status NVARCHAR(20) CHECK (Status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    AdminNote NVARCHAR(MAX) null,
);

ALTER TABLE GuideApplications
ADD LicenseProof NVARCHAR(MAX) NULL;

-- Table: Guide Bookings
CREATE TABLE GuideBookings (
    GuideBookingId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    GuideId INT FOREIGN KEY REFERENCES TourGuides(GuideId) ON DELETE CASCADE ON UPDATE CASCADE,
    BookingDate DATETIME DEFAULT GETDATE(),
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
	RatePerHour DECIMAL(10, 2) NOT NULL, 
    
    TotalPrice AS DATEDIFF(HOUR, StartTime, EndTime) * RatePerHour
    --PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) NOT NULL
);



-- Table: PathReviews
CREATE TABLE PathReviews (
    ReviewId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    PathId INT FOREIGN KEY REFERENCES Paths(PathId) ON DELETE CASCADE ON UPDATE CASCADE,
    Rating INT CHECK (Rating BETWEEN 1 AND 5) NOT NULL,
    Comment NVARCHAR(MAX),
    ReviewDate DATETIME DEFAULT GETDATE()
);

-- Table: GuideReviews
CREATE TABLE GuideReviews (
    ReviewId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    GuideId INT FOREIGN KEY REFERENCES TourGuides(GuideId) ON DELETE CASCADE ON UPDATE CASCADE,
    Rating INT CHECK (Rating BETWEEN 1 AND 5) NOT NULL,
    Comment NVARCHAR(MAX),
    ReviewDate DATETIME DEFAULT GETDATE()
);

-- Table: Notifications
CREATE TABLE Notifications (
    NotificationId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    Message NVARCHAR(MAX),
    IsRead BIT DEFAULT 0,
    NotificationDate DATETIME DEFAULT GETDATE()
);

-- Table: Admins
CREATE TABLE Admins (
    AdminId INT PRIMARY KEY IDENTITY,
    Role NVARCHAR(50) NOT NULL,
    CreatedDate DATETIME DEFAULT GETDATE(),
    Password NVARCHAR(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    PasswordHash VARBINARY(MAX) NOT NULL
);

-- Table: Contact Us
CREATE TABLE ContactUs (
    ContactId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    PhoneNumber NVARCHAR(20) NULL,
    Subject NVARCHAR(255) NULL,
    Message NVARCHAR(MAX) NOT NULL,
    SubmissionDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(50) DEFAULT 'Pending',
    AdminResponse NVARCHAR(MAX) NULL,
    AdminResponseDate DATETIME NULL
);

-- Table: Popular Destinations
CREATE TABLE PopularDestinations (
    DestinationId INT PRIMARY KEY IDENTITY,
    DestinationName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Image NVARCHAR(MAX) DEFAULT 'default-destination.jpg',
    PostDate DATETIME DEFAULT GETDATE(),
    Author NVARCHAR(100) NULL
);

-- Table: Checkpoints
CREATE TABLE Checkpoints (
    CheckpointId INT PRIMARY KEY IDENTITY,
    PathId INT FOREIGN KEY REFERENCES Paths(PathId) ON DELETE CASCADE ON UPDATE CASCADE,
    CheckpointName NVARCHAR(100) NOT NULL,
    CheckpointDescription NVARCHAR(MAX) NOT NULL,
    CheckpointOrder INT NOT NULL
);

CREATE TABLE PathOrders (
    OrderId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    BookingId INT FOREIGN KEY REFERENCES Bookings(BookingId) , -- Link to Path bookings
    TotalAmount DECIMAL(10, 2) NOT NULL, -- The total amount to be paid for the booking
    PaymentMethod NVARCHAR(50) NOT NULL, -- Payment method (e.g., 'Credit Card', 'PayPal')
    PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) NOT NULL, -- Status of the payment
    PaymentDate DATETIME DEFAULT GETDATE() -- The date and time the payment was made
);

-- For GuideBookings
CREATE TABLE GuideOrders (
    GuideOrderId INT PRIMARY KEY IDENTITY,
    UserId INT FOREIGN KEY REFERENCES Users(UserId) ON DELETE CASCADE ON UPDATE CASCADE,
    GuideBookingId INT FOREIGN KEY REFERENCES GuideBookings(GuideBookingId),
    TotalAmount DECIMAL(10, 2) NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    PaymentStatus NVARCHAR(20) CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')) NOT NULL,
    PaymentDate DATETIME DEFAULT GETDATE()
);
