import React, {useState, useEffect} from "react";
import { ItemPageContainer } from './ItemPageContainer';

export const JobContainer = ({ item }) => {

    const [data, setData] = useState([])
    const [load, setloading] = useState(true)
    const url = "http://localhost:5001/api/v1/jobs";
    
    useEffect (()=>{
        fetch(url)
        .then((response) =>response.json())
        .then((json) =>setData (json))
        .catch((error) => console.error(error))
        .finally(() => setloading(false))
        }, [])

  return (
    <ItemPageContainer
      title={item.title}
    />
  );
};