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
   Account:"account",
   Others: "others"
} as const;
type ContentType = typeof ContentType[keyof typeof ContentType];



export function CreateContent({ open, onClose }) {

   const [loading, Setloading] = useState(false);

   const TitleRef = useRef<HTMLInputElement>(null);
   const LinkRef = useRef<HTMLInputElement>(null);
   const [type, Settype] = useState<ContentType>(ContentType.Youtube)




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
        {/* // addcontent page..... */}

      {open && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white p-10 md:p-20 border-2 shadow-2xl rounded-xl relative w-[90%] max-w-lg">
      <div className="flex gap-2 text-xl text-purple-500 justify-center items-center mb-6">
        <Logo />
        <b className="text-blue-500">CortexMark</b>
      </div>

      <div
        className="absolute top-4 right-4 cursor-pointer hover:scale-110 transition-transform"
        onClick={onClose}
      >
        <CrossIcon />
      </div>

      <div>
        <Input reference={TitleRef} placeholder="Title" type="text" />
        <Input reference={LinkRef} placeholder="Link" type="Link" />

        <b className="block mt-4 text-purple-600">Select your type</b>

        <div className="flex flex-wrap gap-2 mt-3">
          <Button
            styleType={type === ContentType.Youtube ? "primarystyle" : "secondarystyle"}
            text="Youtube"
            variant={type === ContentType.Youtube ? "primary" : "secondary"}
            onClick={() => Settype(ContentType.Youtube)}
          />
          <Button
            styleType={type === ContentType.Twitter ? "primarystyle" : "secondarystyle"}
            text="Twitter"
            variant={type === ContentType.Twitter ? "primary" : "secondary"}
            onClick={() => Settype(ContentType.Twitter)}
          />
          <Button
            styleType={type === ContentType.Documents ? "primarystyle" : "secondarystyle"}
            text="Document"
            variant={type === ContentType.Documents ? "primary" : "secondary"}
            onClick={() => Settype(ContentType.Documents)}
          />
          <Button
            styleType={type === ContentType.Others ? "primarystyle" : "secondarystyle"}
            text="Others"
            variant={type === ContentType.Others ? "primary" : "secondary"}
            onClick={() => Settype(ContentType.Others)}
          />
          <Button
            styleType={type === ContentType.Account ? "primarystyle" : "secondarystyle"}
            text="Account"
            variant={type === ContentType.Account ? "primary" : "secondary"}
            onClick={() => Settype(ContentType.Account)}
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={addcontent}
            variant="primary"
            text="Submit"
            styleType="primarystyle"
            endIcon={<Submit />}
            fullwidth={true}
            loading={loading}
          />
        </div>
      </div>
    </div>
  </div>
)}

   </div>

}

