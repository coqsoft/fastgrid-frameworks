import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./Layout";
import { tutorials } from "./List";
export default function App() {
   return (
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/grid/02-sets" replace />} />
            {tutorials.map((t) => (<Route key = {t.fullPath} path = {t.fullPath} element = { <Suspense fallback={<div>Loading tutorial...</div>}> <t.Component /> </Suspense> } />))}
         </Route>
         <Route path="*" element={<Navigate to="/grid/02-sets" replace />} />
      </Routes>
      </BrowserRouter>
   );
}