import { Navigate, Route, Routes } from "react-router-dom";
import Example from "../pages/Example";

export default function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Example />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
