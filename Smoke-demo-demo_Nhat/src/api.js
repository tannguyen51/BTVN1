import React, { useEffect, useState } from "react";
import api from "./api"; // import instance axios đã cấu hình

function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Gọi API khi component mount
    api.get("/endpoint") // thay /endpoint bằng đường dẫn API thật
      .then((response) => {
        setData(response.data); // lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  return (
    <div>
      <h2>Kết quả API:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ExampleComponent;