import { Box, Button, Typography } from "@mui/material";
import s from "./Hero.module.scss";
import Container from "../../../components/Container/Container";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <Box
            position={"relative"}
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <img className={s.img} src="/mainTrain.webp" alt="" />
            <Container>
                <Box
                    display="flex"
                    height={"90vh"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems="center"
                    gap={2}
                >
                    <Typography
                        align="center"
                        variant="h2"
                        color="primary"
                        gutterBottom
                    >
                        Следите за поездом
                    </Typography>
                    <Typography
                        align="center"
                        color="primary"
                        variant="h5"
                        gutterBottom
                    >
                        Отслеживайте местоположение поезда без проблем
                    </Typography>
                    <Button color="secondary" size="large" variant="contained">
                        <span>Начать</span>
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Hero;
