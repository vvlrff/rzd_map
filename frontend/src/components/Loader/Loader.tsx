import s from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={s.container}>
            <div className={s.ldsFacebook}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader;
