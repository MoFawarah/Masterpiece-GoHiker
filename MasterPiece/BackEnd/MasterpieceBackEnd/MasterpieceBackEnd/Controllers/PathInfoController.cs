using MasterpieceBackEnd.DTOs;
using MasterpieceBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace MasterpieceBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathInfoController : ControllerBase
    {
        private readonly MyDbContext _db;

        public PathInfoController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetAllPathInfo")]
        public IActionResult GetAllPathInfo([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            // Get the total count of PathInfos
            var totalItems = _db.PathInfos.Count();

            // Get the paginated data
            var pathInfos = _db.PathInfos
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .Select(PI => new PathInfoResponseDTO
                            {
                                PathInfoId = PI.PathInfoId,
                                GatheringPlace = PI.GatheringPlace,
                                DepartureTime = PI.DepartureTime,
                                Duration = PI.Duration,
                                Distance = PI.Distance,
                                RoadmapImage = PI.RoadmapImage,
                                PathResponseDTO = new PathResponseForINFODTO
                                {
                                    PathId = PI.Path.PathId,
                                    PathImage = PI.Path.PathImage,
                                    City = PI.Path.City,
                                    Description = PI.Path.Description,
                                    Difficulty = PI.Path.Difficulty,
                                }
                            })
                            .ToList();

            // If no data found, return no content
            if (!pathInfos.Any())
            {
                return NoContent();
            }

            // Return both totalItems and the paginated items
            return Ok(new
            {
                totalItems = totalItems, // Total count of all items
                items = pathInfos // The paginated items
            });
        }


        [HttpGet("GetPathInfoByPathID/{pathId}")]
        public IActionResult GetPathInfoByPathID(int pathId)
        {




            var pathInfo = _db.PathInfos.Where(PI => PI.PathId == pathId)

                            .Select(PI => new PathInfoResponseDTO
                            {
                                PathInfoId = PI.PathInfoId,
                                GatheringPlace = PI.GatheringPlace,
                                DepartureTime = PI.DepartureTime,
                                Duration = PI.Duration,
                                Distance = PI.Distance,
                                RoadmapImage = PI.RoadmapImage,
                                PathResponseDTO = new PathResponseForINFODTO
                                {
                                    PathId = PI.Path.PathId,
                                    PathImage = PI.Path.PathImage,
                                    City = PI.Path.City,
                                    Description = PI.Path.Description,
                                    Difficulty = PI.Path.Difficulty,
                                }
                            })
                            .ToList();

            // If no data found, return no content
            if (!pathInfo.Any())
            {
                return NoContent();
            }


            return Ok(pathInfo);

        }



        [HttpGet("GetPathInfoById/{id}")]
        public IActionResult GetPathById(int id)
        {
            var pathInfo = _db.PathInfos.Find(id);

            if (pathInfo == null)
            {
                return NotFound($"No Path With Id {id} found");
            }

            return Ok(pathInfo);
        }







        [HttpDelete("DeletePathInfoById/{id}")]

        public IActionResult DeletePathInfo(int id)
        {
            var pathInfo = _db.PathInfos.Find(id);

            if (pathInfo == null)
            {
                return NotFound($"No path with Id {id} found");
            }

            _db.PathInfos.Remove(pathInfo);
            _db.SaveChanges();
            return Ok(pathInfo);

        }


        [HttpPost("CreateNewPathInfo")]

        public async Task<IActionResult> CreateNewPathInfo([FromForm] PathInfoRequestDTO pathInfoDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";


            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            if (pathInfoDTO.RoadmapImage != null)
            {

                var ImageFile = System.IO.Path.Combine(uploadFolder, pathInfoDTO.RoadmapImage.FileName);


                using (var stream = new FileStream(ImageFile, FileMode.Create))
                {
                    await pathInfoDTO.RoadmapImage.CopyToAsync(stream);
                }
            }





            var newPathInfo = new PathInfo
            {
                GatheringPlace = pathInfoDTO.GatheringPlace,
                DepartureTime = pathInfoDTO.DepartureTime,
                Duration = pathInfoDTO.Duration,
                Distance = pathInfoDTO.Distance,
                RoadmapImage = pathInfoDTO.RoadmapImage.FileName,

                PathId = pathInfoDTO.PathId,
            };

            _db.PathInfos.Add(newPathInfo);
            _db.SaveChanges();


            return Ok(newPathInfo);

        }



        [HttpPut("UpdatePathInfoById/{id}")]

        public async Task<IActionResult> UpdatePathInfo(int id, [FromForm] PathInfoRequestDTO pathInfoDTO)
        {
            var pathInfo = _db.PathInfos.FirstOrDefault(p => p.PathInfoId == id);

            var uploadFolder = @"C:\Users\Orange\Desktop\Masterpiece\MasterPiece\FrontEnd\Uploads";

            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            if (pathInfoDTO.RoadmapImage != null)
            {

                var ImageFile = System.IO.Path.Combine(uploadFolder, pathInfoDTO.RoadmapImage.FileName);


                using (var stream = new FileStream(ImageFile, FileMode.Create))
                {
                    await pathInfoDTO.RoadmapImage.CopyToAsync(stream);
                }

                pathInfo.RoadmapImage = pathInfoDTO.RoadmapImage.FileName;
            }

            if (pathInfo == null)
            {
                return NotFound("PathInfo not found");
            }





            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            pathInfo.GatheringPlace = pathInfoDTO.GatheringPlace;
            pathInfo.DepartureTime = pathInfoDTO.DepartureTime;
            pathInfo.Duration = pathInfoDTO.Duration;
            pathInfo.Distance = pathInfoDTO.Distance;




            _db.PathInfos.Update(pathInfo);
            _db.SaveChanges();


            return Ok(pathInfo);

        }
    }
}
