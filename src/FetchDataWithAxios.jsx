import axios from "axios";
import React, { useEffect, useState } from "react";

function FetchDataWithAxios() {
    const baseURL='http://codedistrictem.com:7010/api/v1/topic/getAll'


    const [post,setPost]=useState(null)

    useEffect (() =>{
        axios.post(baseURL),{
            "algorithm": "blind_popularity",
            "asofdate": 1678197239.27,
            "namespace_id": 1,
            "page_number": 1,
            "page_size": 15,
            "search": "",
            "filter": 0,
            "asof": "default",
            "user_email": ""
        
          }.then((response) =>{
            setPost(response.data.data.topic)
            console.log("data","post")
        })
    })














    return ( <>
        
        
        </> );
}

export default FetchDataWithAxios;