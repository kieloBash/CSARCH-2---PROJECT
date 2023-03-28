import "./index.css";
import { Routes, Route } from "react-router-dom";

import Home from "./scenes/Home";

function App() {
  return (
    <div className="App">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
