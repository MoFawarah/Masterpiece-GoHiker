using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuideController : ControllerBase
    {
        private readonly MyDbContext _db;

        public GuideController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllGuideApplications")]
        public IActionResult GetAllGuideApplications([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {

            var totalItems = _db.GuideApplications.Count();
            var guideApplications = _db.GuideApplications.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            if (!guideApplications.Any())
            {
                return NotFound("No Applications Found");

            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = guideApplications
            });


        }



        [HttpPost("CreateGuideApplication")]
        public async Task<IActionResult> CreateGuideApplication([FromForm] GuideApplicationRequestDTO applicationDTO)
        {

            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }


            if (applicationDTO.GuideImage != null)
            {
                if (applicationDTO.GuideImage.Length > (5 * 1024 * 1024))

                {
                    ModelState.AddModelError("GuideImage", "Guide Image size should not exceed 5 MB.");

                }
                else
                {



                    var ImageFile = System.IO.Path.Combine(uploadFolder, applicationDTO.GuideImage.FileName);


                    using (var stream = new FileStream(ImageFile, FileMode.Create))
                    {
                        await applicationDTO.GuideImage.CopyToAsync(stream);
                    }

                }
            }


            if (applicationDTO.LicenseProof != null)
            {
                if (applicationDTO.LicenseProof.Length > (10 * 1024 * 1024))
                {
                    ModelState.AddModelError("LicenseProof", "License Proof size should not exceed 10 MB.");

                }
                else
                {



                    var LicenseFile = System.IO.Path.Combine(uploadFolder, applicationDTO.LicenseProof.FileName);


                    using (var stream = new FileStream(LicenseFile, FileMode.Create))
                    {
                        await applicationDTO.LicenseProof.CopyToAsync(stream);
                    }

                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newGuideApplication = new GuideApplication
            {
                Name = applicationDTO.Name,
                Age = applicationDTO.Age,
                PhoneNumber = applicationDTO.PhoneNumber,
                Email = applicationDTO.Email,
                City = applicationDTO.City,
                Description = applicationDTO.Description,
                RatePerHour = applicationDTO.RatePerHour,
                GuideImage = applicationDTO.GuideImage.FileName,
                LicenseProof = applicationDTO.LicenseProof.FileName,


            };

            _db.GuideApplications.Add(newGuideApplication);
            _db.SaveChanges();

            return Ok(newGuideApplication);



        }


        [HttpPut("UpdateGuideApplication/{id}")]
        public IActionResult UpdateGuideApplication(int id, [FromForm] GuideApplicationUpdateDTO appDTO)
        {
            var guideApp = _db.GuideApplications.Where(app => app.ApplicationId == id).FirstOrDefault();

            if (guideApp == null)
            {
                return NotFound("No Guide Application Found");
            }

            guideApp.Status = appDTO.Status;
            guideApp.AdminNote = appDTO.AdminNote;

            _db.GuideApplications.Update(guideApp);
            _db.SaveChanges();

            TourGuide newGuide = _db.TourGuides.FirstOrDefault(g => g.Email == guideApp.Email);

            //Later >>> add a unique constraint to the email address and add validations on the FE and BE

            if (guideApp.Status == "Approved")
            {
                if (newGuide == null)
                {

                    newGuide = new TourGuide
                    {
                        Name = guideApp.Name,
                        Email = guideApp.Email,
                        GuideImage = guideApp.GuideImage,
                        PhoneNumber = guideApp.PhoneNumber,
                        Age = guideApp.Age,
                        City = guideApp.City,
                        Description = guideApp.Description,
                        RatePerHour = guideApp.RatePerHour,
                        Approved = true,
                    };

                    _db.TourGuides.Add(newGuide);
                }
                else
                {
                    //update Ya Mohammad >> already exists
                    newGuide.Name = guideApp.Name;
                    newGuide.GuideImage = guideApp.GuideImage;
                    newGuide.PhoneNumber = guideApp.PhoneNumber;
                    newGuide.Age = guideApp.Age;
                    newGuide.City = guideApp.City;
                    newGuide.Description = guideApp.Description;
                    newGuide.RatePerHour = guideApp.RatePerHour;
                    newGuide.Approved = true;

                    _db.TourGuides.Update(newGuide);
                }
            }
            else
            {
                // remove it ya mhmd
                if (newGuide != null)
                {
                    _db.TourGuides.Remove(newGuide);
                }
            }

            _db.SaveChanges();
            return Ok();
        }



        [HttpGet("GetApplicationById/{id}")]
        public IActionResult GetApplicationById(int id)
        {
            var application = _db.GuideApplications.Where(app => app.ApplicationId == id).FirstOrDefault();

            if (application == null)
            {
                return NotFound("No Guide Appication Found");

            }

            return Ok(application);

        }


        [HttpGet("GetGuides")]
        public IActionResult GetGuides([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.TourGuides.Count();
            var guides = _db.TourGuides.Skip((page - 1) * pageSize).Take(pageSize).ToList();

            if (!guides.Any())
            {
                return NotFound("No Guides Found");

            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = guides
            });

        }


    }
}
