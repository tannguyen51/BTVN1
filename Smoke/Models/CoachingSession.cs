using Smoke.Models;
using System;
using System.Collections.Generic;

namespace Smoke.Models
{
    public class CoachingSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int CoachId { get; set; }
        public User Coach { get; set; }
        public List<Message> Messages { get; set; } = new List<Message>();
        public DateTime ScheduledTime { get; set; }
        public string Status { get; set; } = "scheduled"; // scheduled, ongoing, completed
    }

    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}