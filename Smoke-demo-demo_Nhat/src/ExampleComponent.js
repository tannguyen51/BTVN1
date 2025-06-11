import React, { useEffect, useState } from "react";
import api from "./api";

function ExampleComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/endpoint") // Thay /endpoint bằng endpoint thật
      .then((response) => {
        setData(response.data);
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