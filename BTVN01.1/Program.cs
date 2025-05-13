namespace BTVN01._1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int a = 2;
            int b = 3;
            Console.WriteLine(a + " " + b);

            static void HoanDoi(ref int a, ref int b)
            {
                int hd = a;
                a = b;
                b = hd;
            }

            HoanDoi(ref a, ref b);

            Console.WriteLine(a + " " + b);


        }
    }
}
