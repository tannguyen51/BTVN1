namespace BTVN01._2
{
    
    internal class Program
    {
        
        static void Main(string[] args)
        {
            static void PhanTichSo(int so, out int tram, out int chuc, out int donVi)
            {
                tram = so / 100;
                chuc = (so % 100) / 10;
                donVi = so % 10;
            }

            int so = 567;
            int tram, chuc, donVi;

            PhanTichSo(so, out tram, out chuc, out donVi);

            Console.WriteLine("Gia tri so ban dau la " + so);
            Console.WriteLine("Gia tri so hàng tram la " + tram);
            Console.WriteLine("Gia tri so hàng chuc la " + chuc);
            Console.WriteLine("Gia tri so hàng đơn vi la "+ donVi);

        }
    }
}
