import type { ReactElement } from "react";

interface ButtonProps{
     variant:"primary"|"secondary";
     styleType:"primarystyle"|"secondarystyle";
     text: string,
     startIcon?: ReactElement,
     endIcon?:ReactElement,
     onClick?: ()=>void,
     fullwidth?:boolean,
    loading ?:boolean
     
}


 const variantclasses ={
     "primary":"bg-purple-600 text-white",
     "secondary":"bg-purple-300 text-purple-600"
}

const defaultStyle= {
  "primarystyle":" px-2 py-2 rounded-lg font-light flex items-center",
  "secondarystyle":"px-2 py-2 rounded-md  font-medium flex  items-center"

}

export function Button({ variant, styleType, text, startIcon ,endIcon , onClick , fullwidth,loading }: ButtonProps) {
    return (
        <button disabled={loading} onClick={onClick} type="button" className={`${variantclasses[variant]} ${defaultStyle[styleType]} ${fullwidth ? " w-64 flex justify-center items-center  hover:border-bg-gray-300 hover:border-2 hover:bg-purple-500":""}
       ${loading ? "opacity-90" :""}`} >
              <div className="pr-1 ">{startIcon}</div>
            {text}
            <div className="pl-2 pt-2">{endIcon}</div>
        </button>
    );
}