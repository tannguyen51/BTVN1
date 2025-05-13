namespace Project1 // package (java)
{
    internal class Program
    {   
        // pass by Value: Truyền giá trị vào 1 biến
        // ghi tên biến vào hàm
        // pass by reference : truyền vào địa chỉ 1 biến
        // "ref"or "out"
        static void Main(string[] args)
        {
            //int so = 5;
            //Tanglen(ref  so);
            //Console.WriteLine(so);
            //int kg;
            //tong(2,3,out kg);
            //Console.WriteLine(kg);
            
            // lặp qua từng phần tử
            int[] array = { 1, 2, 3, 4, 5 };
            foreach (int i in array)
            {
                Console.WriteLine(i);
            }
            //Console.WriteLine("Hello, World!");
            //Console.Write("Hello");
            //String str = Console.ReadLine(); // nhan value string
            //Console.WriteLine(str);
            //string num1_raw = Console.ReadLine();
            //int num1 = 0;
            ////TryParse ( < string có thể nhận> , out <Biến nhận giá trị>)
            //bool isNumber = int.TryParse(num1_raw, out num1);
            //if (isNumber == true)
            //{
            //    Console.WriteLine(num1);
            //}

            //**************
            //ref & out
            //ref : - phải gắn value cho biến trước khi truyền vào hàm
            //       - có thể gán value mới cho biến trong hàm( 0 bắt buộc)
             //        - Thay đổi giá trị truyền vào
            //out Không cần phải gắn value ban đầu cho biến trước khi truyền vào hàm
        }   //      - phải gắn value  trước khi thoát khỏi hàm
            //      - Trả về luân chuyển từ 1 phương thức
            static void Tanglen(ref int a)
        {
            a += 1;
        }
        static void tong(int a, int b, out int c)
        {
            c = a + b;
        }
    }
}