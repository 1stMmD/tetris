import "./style.css";

const StatusTable = ({dir , name , data}) => {
    return (
        <div className={`table ${dir}`}>
            <p className="name">{name}</p>
            <p className="data">{data}</p>
        </div>
    );
}

export default StatusTable;
