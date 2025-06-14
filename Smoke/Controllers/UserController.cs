using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Smoke.DTOs;
using Smoke.Services;
using System.Security.Claims;

namespace Smoke.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("membership")]
        public async Task<IActionResult> UpdateMembership([FromBody] string membership)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await _userService.UpdateMembership(userId, membership);
                return Ok(new { Message = "Membership updated" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("smoking-status")]
        public async Task<IActionResult> UpdateSmokingStatus([FromBody] SmokingStatusDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await _userService.UpdateSmokingStatus(userId, dto);
                return Ok(new { Message = "Smoking status updated" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("quit-plan")]
        public async Task<IActionResult> UpdateQuitPlan([FromBody] QuitPlanDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await _userService.UpdateQuitPlan(userId, dto);
                return Ok(new { Message = "Quit plan updated" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("progress")]
        public async Task<IActionResult> RecordProgress([FromBody] ProgressDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await _userService.RecordProgress(userId, dto);
                return Ok(new { Message = "Progress recorded" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("feedback")]
        public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackDTO dto)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                await _userService.SubmitFeedback(userId, dto);
                return Ok(new { Message = "Feedback submitted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboard()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
                var dashboard = await _userService.GetDashboard(userId);
                return Ok(dashboard);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}