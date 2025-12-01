
type InputProps = {
  placeholder: string;
  type?:"text" | "email" | "password"|"Link";
  reference?:any;
};

export function Input({ placeholder , reference ,type }:InputProps){
        
        return (
  <input
    ref={reference}
    placeholder={placeholder}
    type={type}
    className="px-8 py-2 w-80 bg-gray-200 border border-gray-400 rounded mb-4 shadow-md 
               hover:border-purple-600 
                hover:border-1.5
               focus:border-purple-600 
        focus:outline-none"
  />
);

        
}