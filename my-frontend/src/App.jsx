import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UrlShortner from "./Components/UrlShortner";
import Originalurl from "./Components/Orignalurl";
import UpdateShortUrl from "./Components/UpdateShortUrl";
import DeleteShortUrl from "./Components/DeleteShortUrl";
import GetStatistics from "./Components/GetStatistics";
import Sidebar from "./Components/Sidebar";

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex bg-blue-500">
          <Sidebar />
          <div className="flex-1 overflow-hidden ">
            <Routes>
              <Route
                path="/"
                element={<UrlShortner backendUrl={backendUrl} />}
              />
              <Route
                path="/orignal"
                element={<Originalurl backendUrl={backendUrl} />}
              />
              <Route
                path="/update"
                element={<UpdateShortUrl backendUrl={backendUrl} />}
              />
              <Route
                path="/delete"
                element={<DeleteShortUrl backendUrl={backendUrl} />}
              />
              <Route
                path="/stats"
                element={<GetStatistics backendUrl={backendUrl} />}
              />
            
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
