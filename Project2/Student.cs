using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project2
{
    public class Student
    {
        //private String Name;
        //private int Age;
        public String Name { get; set; }
        public int Age { get; set; }
        public Student(string name, int age)
        {
            Name = name;
            Age = age;
        }

        public override string? ToString()
        {
            return base.ToString();
        }
    }
}
