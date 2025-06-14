using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Smoke.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public string Membership { get; set; } = "free"; // free, premium, pro
        public Profile Profile { get; set; }
        public SmokingStatus SmokingStatus { get; set; }
        public QuitPlan QuitPlan { get; set; }
        public List<Progress> Progress { get; set; } = new List<Progress>();
        public List<Achievement> Achievements { get; set; } = new List<Achievement>();
        public List<Feedback> Feedback { get; set; } = new List<Feedback>();
    }

    public class Profile
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int? Age { get; set; }
        public string Gender { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class SmokingStatus
    {
        public int Id { get; set; }
        public int CigarettesPerDay { get; set; }
        public string SmokingFrequency { get; set; }
        public decimal CigaretteCost { get; set; }
        public DateTime LastUpdated { get; set; }
    }

    public class QuitPlan
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime TargetQuitDate { get; set; }
        public List<Stage> Stages { get; set; } = new List<Stage>();
    }

    public class Stage
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; } // in days
    }

    public class Progress
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int CigarettesSmoked { get; set; }
        public string HealthNotes { get; set; }
        public decimal MoneySaved { get; set; }
        public int SmokeFreeDays { get; set; }
    }

    public class Achievement
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DateEarned { get; set; }
    }

    public class Feedback
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Date { get; set; }
    }
}