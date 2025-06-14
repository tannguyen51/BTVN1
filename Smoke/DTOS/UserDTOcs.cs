namespace Smoke.DTOs
{
    public class RegisterDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class SmokingStatusDTO
    {
        public int CigarettesPerDay { get; set; }
        public string SmokingFrequency { get; set; }
        public decimal CigaretteCost { get; set; }
    }

    public class QuitPlanDTO
    {
        public string Reason { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime TargetQuitDate { get; set; }
        public List<StageDTO> Stages { get; set; }
    }

    public class StageDTO
    {
        public string Description { get; set; }
        public int Duration { get; set; }
    }

    public class ProgressDTO
    {
        public int CigarettesSmoked { get; set; }
        public string HealthNotes { get; set; }
    }

    public class FeedbackDTO
    {
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}