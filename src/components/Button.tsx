// import type { ReactElement } from "react";

// interface ButtonProps{
//      variant:"primary"|"secondary";
//      styleType:"primarystyle"|"secondarystyle";
//      text: string,
//      startIcon?: ReactElement,
//      endIcon?:ReactElement,
//      onClick?: ()=>void,
//      fullwidth?:boolean,
//     loading ?:boolean
     
// }


//  const variantclasses ={
//      "primary":"bg-purple-600 text-white",
//      "secondary":"bg-purple-300 text-purple-600"
// }

// const defaultStyle= {
//   "primarystyle":" px-2 py-2 rounded-lg font-light flex items-center",
//   "secondarystyle":"px-2 py-2 rounded-md  font-medium flex  items-center"

// }

// export function Button({ variant, styleType, text, startIcon ,endIcon , onClick , fullwidth,loading }: ButtonProps) {
//     return (
//         <button disabled={loading} onClick={onClick} type="button" className={`${variantclasses[variant]} ${defaultStyle[styleType]} ${fullwidth ? " w-64 flex justify-center items-center  hover:border-bg-gray-300 hover:border-2 hover:bg-purple-500":""}
//        ${loading ? "opacity-90" :""}`} >
//               <div className="pr-1 ">{startIcon}</div>
//             {text}
//             <div className="pl-2 pt-2">{endIcon}</div>
//         </button>
//     );
// }


import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  styleType: "primarystyle" | "secondarystyle";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullwidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700 hover:border-purple-300 hover:border-2",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-300",
};

const styleClasses = {
  primarystyle: "px-4 py-2.5 rounded-lg font-light",
  secondarystyle: "px-4 py-2.5 rounded-md font-medium",
};

export function Button({
  variant,
  styleType,
  text,
  startIcon,
  endIcon,
  onClick,
  fullwidth,
  loading,
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      type="button"
      className={`
        ${variantClasses[variant]}
        ${styleClasses[styleType]}
        flex items-center justify-center gap-2
        border-2 border-transparent
        transition-all duration-150
        ${fullwidth ? "w-full" : ""}
        ${loading ? "opacity-90 cursor-not-allowed" : ""}
      `}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {text}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
}