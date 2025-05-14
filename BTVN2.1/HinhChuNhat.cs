using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BTVN2._1
{
    internal class HinhChuNhat
    {
        
        public  double chieuDai { get; set; }
        public double chieuRong { get; set; }
        public double TinhChuVi()
        {
            return (chieuDai + chieuRong) * 2;
        }
        public double TinhDienTich()
        {
            return chieuDai * chieuRong;
        }
        public void HienThiThongTin()
        {
            Console.WriteLine("Chieu dai la " + chieuDai);
            Console.WriteLine("Chieu rong la " + chieuRong);
            Console.WriteLine("Chu Vi la " + TinhChuVi());
            Console.WriteLine("Dien tich la " + TinhDienTich());

        }
    }
}
