namespace BTVN1._3
{
    internal class Program
    {
        static void Main(string[] args)
        {
           
            static void TinhToan(int a, int b, out int tong, out int hieu, out int tich, out double thuong){
                tong = a + b;
                hieu = a - b;
                tich = a * b;
                thuong = (double)a / b;
               
            }
            int a = 10;
            int b = 4;
            int tong, hieu, tich;
            double thuong;
            TinhToan( a, b, out tong, out hieu, out tich, out thuong);
                Console.WriteLine(tong);
                Console.WriteLine(hieu);
                Console.WriteLine(tich);
                Console.WriteLine(thuong);
            
        }
    }
}
