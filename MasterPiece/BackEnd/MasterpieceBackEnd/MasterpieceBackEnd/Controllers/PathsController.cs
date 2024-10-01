using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathsController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PathsController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllPaths")]
        public IActionResult GetAllPaths([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var totalItems = _db.Paths.Count();

            var paths = _db.Paths
                           .Skip((page - 1) * pageSize)
                           .Take(pageSize)
                           .Select(p => new PathResponseDTO
                           {
                               PathId = p.PathId,
                               PathName = p.PathName,
                               PathImage = p.PathImage,
                               City = p.City,
                               Description = p.Description,
                               StartDate = p.StartDate,
                               EndDate = p.EndDate,
                               Difficulty = p.Difficulty,
                               Capacity = p.Capacity,
                               PricePerPerson = p.PricePerPerson,
                               CreatedDate = p.CreatedDate,
                               Status = p.Status,


                           })
                           .ToList();

            if (!paths.Any())
            {
                return NoContent();
            }

            return Ok(new
            {
                totalItems = totalItems,
                Items = paths
            });
        }


        [HttpGet("GetAllPathsNoPagination")]
        public IActionResult GetAllPathsNoPagination()
        {
            var paths = _db.Paths


                           .Select(p => new PathResponseDTO
                           {
                               PathId = p.PathId,
                               PathName = p.PathName,
                               PathImage = p.PathImage,
                               City = p.City,
                               Description = p.Description,
                               StartDate = p.StartDate,
                               EndDate = p.EndDate,
                               Difficulty = p.Difficulty,
                               Capacity = p.Capacity,
                               PricePerPerson = p.PricePerPerson,
                               CreatedDate = p.CreatedDate,
                               Status = p.Status,


                           })
                           .ToList();

            if (!paths.Any())
            {
                return NoContent();
            }

            return Ok(paths);
        }





        [HttpGet("GetPathById/{pathId}")]
        public IActionResult GetPathById(int pathId)
        {
            var path = _db.Paths.Find(pathId);

            if (path == null)
            {
                return NotFound($"No Path With Id {pathId} found");
            }

            return Ok(path);
        }








        [HttpDelete("DeletePath/{pathId}")]
        public IActionResult DeletePath(int pathId)
        {
            var path = _db.Paths.Find(pathId);

            if (path == null)
            {
                return NotFound($"No Path with ID {pathId} found");
            }

            _db.Paths.Remove(path);
            _db.SaveChanges();

            return Ok(path);

        }


        [HttpPut("UpdatePath/{pathId}")]
        public async Task<IActionResult> UpdatePath(int pathId, [FromForm] PathRequestDTO path)

        {

            var p = _db.Paths.FirstOrDefault(p => p.PathId == pathId);


            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";


            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            if (path.PathImage != null)
            {

                var ImageFile = System.IO.Path.Combine(uploadFolder, path.PathImage.FileName);


                using (var stream = new FileStream(ImageFile, FileMode.Create))
                {
                    await path.PathImage.CopyToAsync(stream);
                }


                p.PathImage = path.PathImage.FileName;
            }



            if (p == null)
            {
                return NotFound("Path not found");
            }

            p.PathName = path.PathName;

            p.City = path.City;
            p.Description = path.Description;
            p.StartDate = path.StartDate;
            p.EndDate = path.EndDate;
            p.Difficulty = path.Difficulty;
            p.Capacity = path.Capacity;
            p.PricePerPerson = path.PricePerPerson;
            p.Status = path.Status;


            _db.Paths.Update(p);
            _db.SaveChanges();


            return Ok();
        }

        [HttpPost("CreateNewPath")]
        public async Task<IActionResult> CreateNewPath([FromForm] PathRequestDTO path)
        {



            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";


            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            if (path.PathImage != null)
            {

                var ImageFile = System.IO.Path.Combine(uploadFolder, path.PathImage.FileName);


                using (var stream = new FileStream(ImageFile, FileMode.Create))
                {
                    await path.PathImage.CopyToAsync(stream);
                }
            }


            var newPath = new Models.Path
            {
                PathName = path.PathName,
                City = path.City,
                Description = path.Description,
                StartDate = path.StartDate,
                EndDate = path.EndDate,
                Difficulty = path.Difficulty,
                Capacity = path.Capacity,
                PricePerPerson = path.PricePerPerson,
                PathImage = path.PathImage.FileName,
                Status = path.Status,

            };




            _db.Paths.Add(newPath);
            _db.SaveChanges();


            return Ok(newPath);
        }

        [HttpGet("GetAvtivePaths")]
        public IActionResult GetAvtivePaths()
        {
            var activePaths = _db.Paths.Where(path => path.Status == "Active")
                .Select(p => new PathResponseDTO
                {
                    PathId = p.PathId,
                    PathName = p.PathName,
                    PathImage = p.PathImage,
                    City = p.City,
                    Description = p.Description,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Difficulty = p.Difficulty,
                    Capacity = p.Capacity,
                    PricePerPerson = p.PricePerPerson,
                    CreatedDate = p.CreatedDate,
                    Status = p.Status,


                });

            if (!activePaths.Any())
            {
                return NoContent();
            }

            return Ok(activePaths);
        }
    }
}
