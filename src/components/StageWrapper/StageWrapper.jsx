import style from "./StageWrapper.module.css";

const StageWrapper = ({children}) => {
    return (
        <div className={style.StageWrapper}>
            {children}
            <style>{`
                .stageWrapper
                {
                    position:relative;
                    display:flex;
                    background : linear-gradient(0deg, rgba(26,75,163,1) 0%, rgba(68,11,96,1) 80%);
                    padding : 20px;
                    border-radius:20px;
                }
            `}</style>
        </div>
    );
}

export default StageWrapper;
