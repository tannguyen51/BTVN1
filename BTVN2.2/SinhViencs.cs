using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BTVN2._2
{
    internal class SinhViencs
    {
        public string MaSV { get; set; }
        public string TenSV { get; set; }
        public double DiemTB { get; set; }

        public void NhapThongTin()
        {
            Console.WriteLine("Mã SInh Viên :" );
            MaSV = Console.ReadLine();
            Console.WriteLine("Ten Sinh Vien:");
            TenSV = Console.ReadLine();
            Console.WriteLine("DIem TB:" );
            DiemTB = double.Parse(Console.ReadLine());
        }
        public void HienThiThongTin()
        {
            Console.WriteLine($"Ma SV : {MaSV}, Ten Sinh Vien : {TenSV}, Diem Trung Binh : {DiemTB}, Xep Loai : {XepLoai()}");
        }
        public String XepLoai()
        {
            if (DiemTB >= 8)
            {
                return "Gioi";
            }
            else if (DiemTB >= 5)
            {
                return "Kha";
            }
            else
            {
                return "Trung Binh";

            }
        }
    }   
}
