import { Routes, Route, Outlet, Link } from "react-router-dom";
import MainPage                        from './pages/Main/Components';

import './styles/all.scss';

export default function App() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
    </Routes>
  );
}