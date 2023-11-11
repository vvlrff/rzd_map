import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { Box, Footer } from "@mui/material";
import { Header } from "../Header/Header";
import Container from "../Container/Container";

const Layout = () => {
    return (
        <>
            <Header></Header>
            <main>
                <Box height={60}></Box>
                <Outlet />
            </main>
            <footer></footer>
        </>
    );
};

export default Layout;
