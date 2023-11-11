import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import InnerLayout from "./components/Layout/InnerLayout";
import HomePage from "./pages/HomePage/HomePage";
import DataPage from "./pages/DataPage/DataPage";
import MapPage from "./pages/MapPage/MapPage";
import IdPage from "./pages/IdPage/IdPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MenuPage from "./pages/MenuPage/MenuPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="menu" element={<InnerLayout />}>
                <Route index element={<MenuPage />} /> */}
            <Route path="map" element={<MapPage />} />
            <Route path="data" element={<DataPage />} />
            <Route path="data/:id" element={<IdPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* </Route> */}
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
