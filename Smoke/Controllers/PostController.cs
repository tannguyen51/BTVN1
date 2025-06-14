using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Smoke.Data;
using Smoke.DTOs;
using Smoke.Models;
using System.Security.Claims;

namespace Smoke.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var post = new Post { UserId = userId, Content = dto.Content, Type = dto.Type };
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Post created" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("feed")]
        public async Task<IActionResult> GetFeed()
        {
            try
            {
                var posts = await _context.Posts.Include(p => p.User).OrderByDescending(p => p.CreatedAt).ToListAsync();
                return Ok(posts);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}