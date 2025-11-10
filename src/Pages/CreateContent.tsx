import { useState } from "react";
import { CrossIcon } from "../icons/Delete";
import { Button } from "../components/Button"
import { Submit } from "../icons/Submit";
import { Input } from "../components/input";
import { Logo } from "../icons/Logo";
import { useRef } from "react"
import axios from "axios";
import { BACKEND_URL } from "../Config"



const ContentType = {
   Youtube: "youtube",
   Twitter: "twitter",
   Documents: "documents",
   Others: "others"
} as const;
type ContentType = typeof ContentType[keyof typeof ContentType];



export function CreateContent({ open, onClose }) {

   const [loading, Setloading] = useState(false);

   const TitleRef = useRef<HTMLInputElement>(null);
   const LinkRef = useRef<HTMLInputElement>(null);
   const [type, Settype] = useState<ContentType>(ContentType.Youtube)


   // backend connection 

   async function addcontent() {
      const title = TitleRef.current?.value;
      const link = LinkRef.current?.value;

      console.log(link);

      if (!title || !link) {
         alert("please Enter link and title here");
         return;
      }

      try {
         Setloading(true)

         await axios.post(`${BACKEND_URL}/api/v1/content/addcontent`, {
            type,
            title,
            link

         }, {
            // header seating
            headers: {
               "Authorization": localStorage.getItem("token")
            }

         })

         alert(" your contents successfully Add Now !!");
         onClose();
      }
      catch (err: any) {


         console.error("content add error:", err);

         alert(err.response?.data?.message || " Contents add  failed. Please try again.");


      } finally {
         Setloading(false); // stop loading
      }

   }

   return <div>
      {/* when user click to create content that type ui */}
      {open && <div className="w-screen h-screen  bg-gray-200 fixed 
              top-0 left-0  flex justify-center">


         <div className="flex flex-col justify-center">

            <div className="bg-white  p-20 opacity-100 border-2 shadow-xl rounded-lg ">

               <div className="flex gap-2 text-xl text-purple-500 md-10 pr-6 justify-center items-center  ">
                  <Logo />
                  <b className="shadow rounded text-blue-500 ">CortexMark</b>
               </div>

               <div className="flex justify-end cursor-pointer" onClick={onClose}>
                  <div className="rounded-md" >

                     <CrossIcon />
                  </div>
               </div>

               <div>

                  <div >
                     <Input reference={TitleRef} placeholder={"Title"} type="text" />
                  </div>

                  <div >
                     <Input reference={LinkRef} placeholder={"Link"} type="Link" />
                  </div>
                  <b className="shadow border-1  text-purple-600 rounded-md  border-gray-400 "> Select your type</b>

                  <div className="flex gap-2 mt-5 mr-4">

                     <Button styleType={type == ContentType.Youtube ? "primarystyle" : "secondarystyle"} text="Youtube" variant={type == ContentType.Youtube ? "primary" : "secondary"} onClick={() => {
                        Settype(ContentType.Youtube)
                     }}></Button>

                     <Button styleType={type == ContentType.Twitter ? "primarystyle" : "secondarystyle"} text="Twitter" variant={type == ContentType.Twitter ? "primary" : "secondary"} onClick={() => {
                        Settype(ContentType.Twitter)
                     }}></Button>


                     <Button styleType={type == ContentType.Documents ? "primarystyle" : "secondarystyle"} text="Document" variant={type == ContentType.Documents ? "primary" : "secondary"} onClick={() => {
                        Settype(ContentType.Documents)
                     }}></Button>

                  </div>

               </div>

               <div className=" mt-2">
                  <Button styleType={type == ContentType.Others ? "primarystyle" : "secondarystyle"} text="Others" variant={type == ContentType.Others ? "primary" : "secondary"} onClick={() => {
                     Settype(ContentType.Others)
                  }}></Button>
               </div>

               <div className="flex justify-center mt-5">
                  <Button onClick={addcontent} variant="primary" text="Submit" styleType="primarystyle" endIcon={<Submit />} fullwidth={true} loading={loading} />
               </div>

            </div>

         </div>

      </div>
      }
   </div>

}

