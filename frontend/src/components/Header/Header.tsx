import {
    Box,
    useScrollTrigger,
    Slide,
    AppBar,
    IconButton,
    Drawer,
    Typography,
    Button,
    MenuItem,
} from "@mui/material";
// import { Container, Box } from "@mui/system";
import { ReactElement, FC, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../Container/Container";

interface IHideOnScroll {
    children: ReactElement;
}

const HideOnScroll: FC<IHideOnScroll> = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

export const Header: FC = () => {
    const [isOpen, setIsOpen] = useState<null | boolean>(null);

    const handleMenuOpen = () => {
        setIsOpen(true);
    };

    const handleMenuClose = () => {
        setIsOpen(false);
    };

    const open = Boolean(isOpen);

    return (
        <HideOnScroll>
            <AppBar
                position={"fixed"}
                // sx={{
                //     backgroundColor: "#fff",
                // }}
                elevation={1}
            >
                <Container paddingY={{ xs: 1 / 2, sm: 1 }}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box display={"flex"} alignItems={"center"}>
                        <Link to={"/"}>
                            {/* <img src={AiOpenLogo} height={65} alt="logo" /> */}
                            logo here
                        </Link>
                    </Box>
                    <Box display="flex" alignItems={"center"}>
                        <Box
                            sx={{ display: { xs: "flex" } }}
                            alignItems={"center"}
                        >
                            <>
                                <IconButton
                                    aria-label="Menu"
                                    onClick={handleMenuOpen}
                                >
                                    {/* <MenuIcon /> */}
                                    click
                                </IconButton>

                                <Drawer
                                    anchor="right"
                                    open={open}
                                    onClose={() => handleMenuClose()}
                                    variant="temporary"
                                    sx={{
                                        "& .MuiPaper-root": {
                                            width: "100%",
                                            maxWidth: {
                                                xs: "100%",
                                                sm: 400,
                                            },
                                            borderRadius: {
                                                xs: "4px",
                                                md: "0",
                                            },
                                            borderTopLeftRadius: {
                                                md: "12px",
                                            },
                                            borderBottomLeftRadius: {
                                                md: "12px",
                                            },
                                        },
                                    }}
                                >
                                    <Box padding={1} height={"100%"}>
                                        {/* <CloseIcon
                                            fontSize="large"
                                            onClick={handleMenuClose}
                                            sx={{ cursor: "pointer" }}
                                        ></CloseIcon> */}
                                        <Box
                                            sx={{
                                                height: "90%",
                                                "& a": {
                                                    padding: "20px",
                                                    height: "100%",
                                                    width: "100%",

                                                    textDecoration: "none",
                                                    color: "inherit",
                                                    "& li": {
                                                        padding: 0,
                                                    },
                                                    // "& li:hover": {
                                                    //     backgroundColor:
                                                    //         "red",
                                                    // },
                                                },
                                            }}
                                        >
                                            {/* <Box
                                                            component={Link}
                                                            to={
                                                                RoutesPath.profile
                                                            }
                                                            onClick={
                                                                handleMenuClose
                                                            }
                                                        >
                                                            Профиль
                                                        </Box> */}
                                            <MenuItem>
                                                <Link
                                                    to={"/menu"}
                                                    onClick={handleMenuClose}
                                                >
                                                    <Typography
                                                        align="center"
                                                        fontWeight={600}
                                                        variant="h6"
                                                    >
                                                        Меню
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                            {/* <MenuItem>
                                                <Link
                                                    to={RoutesPath.subscription}
                                                    onClick={handleMenuClose}
                                                >
                                                    <Typography
                                                        align="center"
                                                        fontWeight={600}
                                                        variant="h6"
                                                    >
                                                        Каталог
                                                    </Typography>
                                                </Link>
                                            </MenuItem> */}
                                            {/* <MenuItem>
                                                <Link
                                                    to={RoutesPath.booking}
                                                    onClick={handleMenuClose}
                                                >
                                                    <Typography
                                                        align="center"
                                                        fontWeight={600}
                                                        variant="h6"
                                                    >
                                                        Бронирование
                                                    </Typography>
                                                </Link>
                                            </MenuItem> */}
                                        </Box>
                                    </Box>
                                </Drawer>
                            </>
                        </Box>
                    </Box>
                </Box>
                </Container>
            </AppBar>
        </HideOnScroll>
    );
};