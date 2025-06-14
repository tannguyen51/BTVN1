using Smoke.Models;
using System;
using System.Collections.Generic;

namespace Smoke.Models
{
    public class Post
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public string Type { get; set; } // achievement, motivation, advice
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public List<int> Likes { get; set; } = new List<int>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }

    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}