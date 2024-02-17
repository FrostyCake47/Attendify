import { useState } from "react";
import useFetch from "../services/useFetch";

const Attendence = () => {
    const [details, useDetails] = useState('null');
    const {data, isPending, error} = useFetch("http://localhost:9000/details");
    
    console.log(data);
    return ( 
        <div className="table">

        </div>
    );
}
 
export default Attendence;