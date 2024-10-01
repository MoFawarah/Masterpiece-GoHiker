using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {

        private readonly MyDbContext _db;

        public ContactUsController(MyDbContext db)
        {
            _db = db;
        }




        [HttpGet("GetAllContactUs")]
        public IActionResult GetAllContactUs([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.Contacts.Count();

            var contacts = _db.Contacts.Skip((page - 1) * pageSize)
                            .Take(pageSize).ToList();


            if (!contacts.Any())
            {
                return NotFound("No Contacts Found");
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = contacts
            });



        }


        [HttpPost("CreateNewContact")]
        public async Task<IActionResult> CreateNewContact([FromForm] ContactRequestDTO contactDTO, [FromServices] EmailService emailService)
        {
            var newContact = new Contact
            {
                Name = contactDTO.Name,
                Email = contactDTO.Email,
                PhoneNumber = contactDTO.PhoneNumber,
                Subject = contactDTO.Subject,
                Message = contactDTO.Message,
                AdminResponse = "N/A",
            };

            _db.Contacts.Add(newContact);
            _db.SaveChanges();

            // Send email after successfully saving to the database
            var subject = "Thank you for your query";
            var message = $"Hello, {newContact.Name}!" +
                $" Thank you for contacting us. This is to inform you that we received your email and we will get in touch as soon as possible";

            await emailService.SendEmailAsync(contactDTO.Email, subject, message);

            return Ok(newContact);
        }


        [HttpPut("EditContactById/{id}")]
        public async Task<IActionResult> EditContact(int id, [FromForm] ContactUpdateDTO contactDTO, [FromServices] EmailService emailService)
        {
            var contact = _db.Contacts.Where(c => c.ContactId == id).FirstOrDefault();

            if (contact == null)
            {
                return NotFound("contact not found");
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contact.Status = contactDTO.Status;
            contact.AdminResponse = contactDTO.AdminResponse;
            contact.AdminResponseDate = contactDTO.AdminResponseDate;

            _db.Contacts.Update(contact);
            _db.SaveChanges();

            // Send email after successful
            var subject = "Response From GoHiker";
            var message = $"Hello, {contact.Name}!" +
                $" {contact.AdminResponse}";

            await emailService.SendEmailAsync(contact.Email, subject, message);

            return Ok(contact);
        }

    }

}
