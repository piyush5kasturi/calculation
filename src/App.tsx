import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Master from "./components/master";
import Layout from "./components/layout";
import Operator from "./components/operator";
import List from "./components/list";
import Calculation from "./components/calculation";
function App() {
  return (
    <>
      <Suspense fallback={<p> Loading...</p>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="master" element={<Master />} />
              <Route path="operator" element={<Operator />} />
              <Route path="calc" element={<Calculation />} />
              <Route path="graph" element={<List />} />
              <Route path="*" element={<Navigate to={"/master"} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
