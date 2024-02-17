import { useState } from "react";
import useFetch from "../services/useFetch";
import DetailLists from "../components/detaillists";
import { useEffect } from "react";

const Attendence = () => {
    const [details, setDetails] = useState([]);
    const {data, isPending, error} = useFetch("http://localhost:9000/details");

    useEffect(() => {
        if (data) {
           setDetails(data);
        }
    }, [data]);
    
    console.log(data);
    return ( 
        <div className="table">
            <div className="mwaa">
                <p className="heading">Name</p>
                <p className="heading">Status</p>
            </div>
            {error && <p className="error">{error.msg}</p>}
            {details && <DetailLists details={details}/>}
        </div>
    );
}
 
export default Attendence;