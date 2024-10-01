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
            var user = _db.Users.Where(u => u.UserId == id).FirstOrDefault();
            if (user == null)
            {
                return NotFound($"No user found with id {id}");
            }

            return Ok(user);


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
    }
}
