import axios from "axios";
import { useState , useEffect } from "react";
import {BACKEND_URL} from "../Config"

export function useContent(){
      const [contents , SetContents] = useState<any[]>([]);

       function refresh(){
              axios.get(`${BACKEND_URL}/api/v1/content/viewcontent`,{
           headers:{
             "Authorization":localStorage.getItem("token")
           }
         })

         .then((response)=>{
             SetContents(response.data.content)
         })
           .catch((err) => {
      console.error("Error fetching content:", err);
    });

       }
       // every 10 sec refresh the content in the ui
      useEffect(() =>{
           refresh();
          let interval = setInterval(()=>{
              refresh();

           } , 10 * 1000)

           // clean up
           return () =>{
             clearInterval(interval);
           }

      },[])

      return {contents,refresh};
}
