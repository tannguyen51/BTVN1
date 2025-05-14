namespace BTVN2._2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SinhViencs[] ds = new SinhViencs[3];
            for (int i = 0; i < ds.Length; i++)
            {
                Console.WriteLine($"Nhâp thong tin sinh vien thu {i + 1}");
                ds[i] = new SinhViencs();
                ds[i].NhapThongTin();

            }

            foreach (var sv in ds)
            {
                sv.HienThiThongTin();
            }
        }
    }
}
