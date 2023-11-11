import s from "./Loader.module.scss";

const Loader = () => {
    return (
        <div className={s.fixedContainer}>
            <div className={s.mainContainer}>
                <div className={s.container}>
                    <div className={s.content}>
                        <div className={s.track}></div>
                        <div className={s.train}>
                            <div className={s.front}></div>
                            <div className={s.wheels}>
                                <div className={s.smallOne}></div>
                                <div className={s.smallTwo}></div>
                                <div className={s.smallThree}></div>
                                <div className={s.smallFour}></div>
                                <div className={s.smallFive}></div>
                                <div className={s.smallSix}></div>
                                <div className={s.big}></div>
                            </div>
                            <div className={s.cord}></div>
                            <div className={s.coach}></div>
                            <div className={s.coachTwo}></div>
                            <div className={s.windows}></div>

                            <div id="up" className={s.steam}></div>
                            <div id="up" className={s.steam2}></div>
                            <div id="up" className={s.steam3}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
