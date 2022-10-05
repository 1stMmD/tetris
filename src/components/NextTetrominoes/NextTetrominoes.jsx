import "./style.css";

const NextTetrominoes = ({player:{tetromine}}) => {
    return (
        <div className="nextTetrominoes">
            <p className="titleNext">Next</p>
            {
                tetromine?.map((item , idx) => {
                    if(idx !== 0){
                        return <div className="cellContainer" key={idx} style={{display : "grid" , gridTemplateColumns : `repeat(${item.shape.length},1fr)` }}>
                            {item.shape.map( (row , y ) => {
                                return row.map((cell , x) => {
                                    return <span key={x} className={`cell ${cell !== 0 ? "colored" : ""}`}></span>
                                })
                            })}
                        </div>
                    }
                })
            }
        </div>
    );
}

export default NextTetrominoes;
