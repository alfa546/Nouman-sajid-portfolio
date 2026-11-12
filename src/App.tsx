import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

const Portfolio = lazy(() => import("./pages/Portfolio"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="route-loading" role="status">
            Loading portfolio…
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/myworks" element={<MyWorks />} />
          <Route path="/play" element={<Play />} />
          <Route
            path="*"
            element={
              <main className="route-not-found wrap">
                <p className="eyebrow">404 / PATH NOT FOUND</p>
                <h1>A little off the grid.</h1>
                <Link className="button button-primary" to="/">
                  Return to portfolio →
                </Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
