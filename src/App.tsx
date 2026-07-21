import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Play />
            </Suspense>
          }
        />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
