using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;

        public UsersController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.Users.Count();
            var users = _db.Users.Skip((page - 1) * pageSize)
                           .Take(pageSize).ToList();
            if (!users.Any())
            {
                return NotFound("No users found");
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = users
            });


        }


        [HttpGet("GetUserById/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _db.Users.Where(u => u.UserId == id).Select(u => new UserProfileResponseDTO
            {
                UserId = u.UserId,
                Name = u.Name,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                City = u.City,
                ImageFileName = u.ImageFileName,

            }).FirstOrDefault();

            if (user == null)
            {
                return NotFound($"No user found with id {id}");
            }

            return Ok(user);


        }



        [HttpPut("EditUser/{id}")]
        public async Task<IActionResult> EditUser(int id, [FromForm] UserProfileUpdateDTO userDTO)
        {

            var user = _db.Users.Where(u => u.UserId == id).FirstOrDefault();



            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";



            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            if (userDTO.ImageFileName != null)
            {

                var ImageFile = System.IO.Path.Combine(uploadFolder, userDTO.ImageFileName.FileName);


                using (var stream = new FileStream(ImageFile, FileMode.Create))
                {
                    await userDTO.ImageFileName.CopyToAsync(stream);
                }
                user.ImageFileName = userDTO.ImageFileName.FileName;

            }





            if (user == null)
            {
                return BadRequest("User Not Found");
            }

            user.Name = userDTO.Name;
            user.Email = userDTO.Email;
            user.PhoneNumber = userDTO.PhoneNumber;
            user.City = userDTO.City;





            _db.Users.Update(user);
            _db.SaveChanges();

            var response = new
            {
                user.Name,
                user.Email,
                user.PhoneNumber,
                user.City,
                user.ImageFileName,
            };


            return Ok(response);
        }


        [HttpPost("Register")]

        public IActionResult Register([FromForm] RegisterRequestDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            byte[] passwordHash;
            byte[] salt;

            PasswordHasher.CreatePasswordHash(userDTO.Password, out passwordHash, out salt);

            var user = new User
            {
                Name = userDTO.Name,
                Email = userDTO.Email,
                PhoneNumber = userDTO.PhoneNumber,
                Password = userDTO.Password,
                PasswordHash = passwordHash,
                PasswordSalt = salt


            };
            _db.Users.Add(user);
            _db.SaveChanges();

            return Ok(user);
        }

        [HttpPost("Login")]
        public IActionResult Login([FromForm] LoginRequestDTO userDTO)
        {

            var user = _db.Users.Where(user => user.PhoneNumber == userDTO.PhoneNumber).FirstOrDefault();

            if (user == null || !PasswordHasher.VerifyPasswordHash(userDTO.Password, user.PasswordHash, user.PasswordSalt))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Generate a token or return a success response

            var token = _tokenGenerator.GenerateToken(user.Email);

            return Ok(new { Token = token, user.UserId });

        }


        [HttpPut("EditPasswordByUserId/{id}")]
        public IActionResult EditPasswordByUserId(int id, [FromForm] EditPasswordRequestDTO uDTO)
        {
            var user = _db.Users.Where(u => u.UserId == id).FirstOrDefault();
            byte[] passwordHash;
            byte[] salt;

            PasswordHasher.CreatePasswordHash(uDTO.newPassword, out passwordHash, out salt);


            if (user.Password != uDTO.oldPassword)
            {
                return BadRequest("Old Password Not Correct");
            }

            user.Password = uDTO.newPassword;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = salt;




            _db.Users.Update(user);
            _db.SaveChanges();

            return Ok(user);






        }


        [HttpGet("GetUserOrderHistory/{id}")]
        public IActionResult GetUserOrderHistory(int id)
        {
            var userHistory = _db.PathOrders.Where(po => po.UserId == id).Select(po => new OrderHistoryDTO
            {
                OrderId = po.OrderId,

                TotalAmount = po.TotalAmount,
                PaymentMethod = po.PaymentMethod,
                PaymentStatus = po.PaymentStatus,
                PaymentDate = po.PaymentDate,

                bookingDTO = new BookingDTO
                {
                    BookingId = po.Booking.BookingId,
                    pathDTO = new PathDTO
                    {
                        PathName = po.Booking.Path.PathName
                    }
                }



            }).ToList();



            return Ok(userHistory);

        }
    }
}
