import { useEffect, useState } from "react";
import axios from "axios";

export default function TestAPI() {
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/test")
      .then((res) => setData(res.data.message))
      .catch(() => setData("Error connecting to backend"));
  }, []);

  return (
    <div style={{ color: "white" }}>
      <h2>Backend Response:</h2>
      <p>{data}</p>
    </div>
  );
}
