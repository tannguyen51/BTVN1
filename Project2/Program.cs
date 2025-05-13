namespace Project2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Student std = new Student("Nguyen Van A", 123);
            //JAva std.setAge(567);
            std.Age = 567;
            //Java std.getAge();
            Console.WriteLine(std.Age);
        }
    }
}
