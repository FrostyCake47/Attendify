import { Link } from "react-router-dom";

const DetailLists = (props) => {
    const details = props.details;

    return ( 
        details.map((detail) => (
            detail.name === 'bg' ? null : (
            <div className="detail" key={detail.id}>
                <p className="detail-item" id='name'>{detail.name}</p>
                <p className="detail-item" id='status'>{detail.status && "Present" || !detail.status && 'Absent'}</p>
            </div>
        )))
    );
}
 
export default DetailLists;