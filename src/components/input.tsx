
type InputProps = {
  placeholder: string;
  type?:"text" | "email" | "password"|"Link";
  reference?:any;
};

export function Input({ placeholder , reference ,type }:InputProps){
        return <input ref={reference} placeholder={placeholder} type={type} className="px-8 py-2 w-80 bg-gray-200 border-1 border-gray-400 rounded mb-4 hover:border-purple-600 hover:border-2 shadow-md"> 
                </input>
        
        
}