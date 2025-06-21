import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="App">
      <h1>React Frontend</h1>
      {data ? (
        <p>
          {data.message} (from {data.source})
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
