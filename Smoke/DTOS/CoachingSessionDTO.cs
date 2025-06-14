namespace Smoke.DTOs
{
    public class CoachingSessionDTO
    {
        public int CoachId { get; set; }
        public DateTime ScheduledTime { get; set; }
    }

    public class MessageDTO
    {
        public int SessionId { get; set; }
        public string Content { get; set; }
    }
}