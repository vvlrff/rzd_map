import { Box, Typography } from "@mui/material";
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
            <img className={s.img} src="/train.webp" alt="" />
            <Container>
                <Typography variant="h2">Да, это поезд</Typography>
                
            </Container>
            
        </Box>
    );
};

export default Hero;
