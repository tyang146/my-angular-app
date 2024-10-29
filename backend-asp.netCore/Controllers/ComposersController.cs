using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("[controller]")]
[ApiController]
public class ComposersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ComposersController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: composers
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Composer>>> GetAllComposers()
    {
        try
        {
            var composers = await _context.Composers.ToListAsync();
            return Ok(composers);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // // GET: composers?page=1&pageSize=10 - used to get databy paginations
    // [HttpGet]
    // public async Task<ActionResult<IEnumerable<Composer>>> GetComposers(int page = 1, int pageSize = 10)
    // {
    //     if (page <= 0 || pageSize <= 0)
    //     {
    //         return BadRequest("Page number and page size must be greater than 0.");
    //     }

    //     // Calculate the total number of records
    //     var totalComposers = await _context.Composers.CountAsync();

    //     // Fetch the composers for the requested page
    //     var composers = await _context.Composers
    //         .Skip((page - 1) * pageSize)
    //         .Take(pageSize)
    //         .ToListAsync();

    //     // Return pagination metadata and the data
    //     var paginationMetadata = new
    //     {
    //         TotalRecords = totalComposers,
    //         PageSize = pageSize,
    //         CurrentPage = page,
    //         TotalPages = (int)Math.Ceiling(totalComposers / (double)pageSize)
    //     };

    //     Response.Headers.Append("X-Pagination", System.Text.Json.JsonSerializer.Serialize(paginationMetadata));

    //     return Ok(composers);
    // }
}
