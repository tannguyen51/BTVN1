using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Smoke.Models;


namespace Smoke.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<CoachingSession> CoachingSessions { get; set; }
    }
}