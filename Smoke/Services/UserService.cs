using Microsoft.EntityFrameworkCore;
using Smoke.Data;
using Smoke.DTOs;
using Smoke.Models;


namespace Smoke.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task UpdateMembership(int userId, string membership)
        {
            var user = await _context.Users.FindAsync(userId);
            user.Membership = membership;
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSmokingStatus(int userId, SmokingStatusDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            user.SmokingStatus = new SmokingStatus
            {
                CigarettesPerDay = dto.CigarettesPerDay,
                SmokingFrequency = dto.SmokingFrequency,
                CigaretteCost = dto.CigaretteCost,
                LastUpdated = DateTime.Now
            };
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuitPlan(int userId, QuitPlanDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            user.QuitPlan = new QuitPlan
            {
                Reason = dto.Reason,
                StartDate = dto.StartDate,
                TargetQuitDate = dto.TargetQuitDate,
                Stages = dto.Stages.Select(s => new Stage { Description = s.Description, Duration = s.Duration }).ToList()
            };
            await _context.SaveChangesAsync();
        }

        public async Task RecordProgress(int userId, ProgressDTO dto)
        {
            var user = await _context.Users.Include(u => u.Progress).Include(u => u.SmokingStatus).FirstOrDefaultAsync(u => u.Id == userId);
            var lastProgress = user.Progress.OrderByDescending(p => p.Date).FirstOrDefault() ?? new Progress { SmokeFreeDays = 0, MoneySaved = 0 };
            var smokeFreeDays = dto.CigarettesSmoked == 0 ? lastProgress.SmokeFreeDays + 1 : 0;
            var moneySaved = lastProgress.MoneySaved + (user.SmokingStatus.CigaretteCost * (user.SmokingStatus.CigarettesPerDay - dto.CigarettesSmoked));

            user.Progress.Add(new Progress
            {
                Date = DateTime.Now,
                CigarettesSmoked = dto.CigarettesSmoked,
                HealthNotes = dto.HealthNotes,
                MoneySaved = moneySaved,
                SmokeFreeDays = smokeFreeDays
            });

            if (smokeFreeDays == 1)
            {
                user.Achievements.Add(new Achievement { Name = "1-Day Smoke Free", Description = "No smoking for a day!", DateEarned = DateTime.Now });
            }
            if (moneySaved >= 100000)
            {
                user.Achievements.Add(new Achievement { Name = "100K Money Saved", Description = "Saved 100K VND!", DateEarned = DateTime.Now });
            }

            await _context.SaveChangesAsync();
        }

        public async Task<Dictionary<string, object>> GetDashboard(int userId)
        {
            var user = await _context.Users.Include(u => u.Progress).Include(u => u.Achievements).FirstOrDefaultAsync(u => u.Id == userId);
            return new Dictionary<string, object>
            {
                { "SmokeFreeDays", user.Progress.OrderByDescending(p => p.Date).FirstOrDefault()?.SmokeFreeDays ?? 0 },
                { "MoneySaved", user.Progress.OrderByDescending(p => p.Date).FirstOrDefault()?.MoneySaved ?? 0 },
                { "Achievements", user.Achievements },
                { "RecentProgress", user.Progress.OrderByDescending(p => p.Date).Take(5).ToList() }
            };
        }

        public async Task SubmitFeedback(int userId, FeedbackDTO dto)
        {
            var user = await _context.Users.FindAsync(userId);
            user.Feedback.Add(new Feedback
            {
                Rating = dto.Rating,
                Comment = dto.Comment,
                Date = DateTime.Now
            });
            await _context.SaveChangesAsync();
        }
    }
}