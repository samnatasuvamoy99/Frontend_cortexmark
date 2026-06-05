
// type InputProps = {
//   placeholder: string;
//   type?:"text" | "email" | "password"|"Link";
//   reference?:any;
// };

// export function Input({ placeholder , reference ,type }:InputProps){
        
//         return (
//   <input
//     ref={reference}
//     placeholder={placeholder}
//     type={type}
//     className="px-8 py-2 w-80 bg-gray-200 border border-gray-400 rounded mb-4 shadow-md 
//                hover:border-purple-600 
//                 hover:border-1.5
//                focus:border-purple-600 
//         focus:outline-none"
//   />
// );

        
// }


type InputProps = {
  placeholder: string;
  type?: "text" | "email" | "password" | "Link";
  reference?: any;
};

export function Input({ placeholder, reference, type }: InputProps) {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      type={type}
      className="
        px-3.5 py-2.5 w-full
        bg-gray-200 border border-gray-400 rounded-lg
        shadow-sm text-sm text-gray-900
        placeholder:text-gray-400
        hover:border-purple-600
        focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200
        transition-all duration-150
      "
    />
  );
}