using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smoke.Data;
using Smoke.DTOs;
using Smoke.Models;
using System.Security.Claims;

namespace Smoke.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CoachingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoachingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> ScheduleSession([FromBody] CoachingSessionDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var session = new CoachingSession { UserId = userId, CoachId = dto.CoachId, ScheduledTime = dto.ScheduledTime };
                _context.CoachingSessions.Add(session);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Coaching session scheduled" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var session = await _context.CoachingSessions.FindAsync(dto.SessionId);
                session.Messages.Add(new Message { SenderId = userId, Content = dto.Content });
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Message sent" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}