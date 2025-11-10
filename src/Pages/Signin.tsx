// import { Input } from "../components/input"
// import { Button } from "../components/Button";
// import { Logo } from "../icons/Logo"
// import { Signinlogo } from "../icons/Signin";
// import { useRef, useState } from "react";
// import  axios  from "axios";
// import {BACKEND_URL} from "../Config"
// import { useNavigate } from "react-router-dom";
// import { Link} from "react-router-dom"


// export function Signin() {
    
//   // backend connection
//    const[loading  , setLoading] = useState(false);


//    const useremailRef=useRef<HTMLInputElement>(null);
//    const passwordRef =useRef<HTMLInputElement>(null);

//    const navigate = useNavigate();

//    async function signin(){
       
//           const email= useremailRef.current?.value;
//           const password = passwordRef.current?.value;
            
//             if ( !email || !password){
//                  alert("Your information is inCorrect!!");
               
//             }
              
//              try{
                
//                setLoading(true)
//                 const responce=  await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
//                       email,
//                       password
//                   })
//                   alert("Welcome you are signin Now !!")
                  
//                   //store token into the localstorage 

//                    const jwt = responce.data.token;

//                    localStorage.setItem("token",jwt);
                   
//                    // redirect the user to the dashboard...
//                 } 
//                 catch(err: any) {


//     console.error("Signup error:", err);

//     alert(err.response?.data?.message || "Signin failed. Please try again.");


//   } finally {
//     setLoading(false); // stop loading
//   }
// } 
          
 
//   return <div className="h-screen w-screen bg-purple-300
//     flex justify-center items-center">
//     <div className="bg-gray-100 rounded-xl shadow-lg border min-w-96 h-90">
    
//     {/*logo*/}

//       <div className="flex gap-2 text-xl text-purple-500 pt-4 justify-center items-center mr-5 ">
//         <Logo />
//         <b className="shadow rounded-md border">Second Brain</b>
//       </div>

//       {/* email , passsword taken to the user*/}

//       <div className="  mt-5 rounded-xl pt-5 justify-items-center">

//         <div>
//           <Input  reference={useremailRef} placeholder="Email" type="text"/>
//         </div>
//         <div>
//           <Input  reference={passwordRef} placeholder="Password" type="text" />
//         </div>

     
//       </div>

//       <div className="flex justify-center pt-2  mb-14  ">

//          <div  >
//                <Button  onClick={signin} variant="primary" styleType="primarystyle" text="Signin" endIcon={<Signinlogo />} fullwidth={true} loading={loading} />

//                <p className="signup-text ml-5 pt-2">
//                  Don’t have an account?{" "}
//                   <a href="/signup" className="sign-up">
//                       <Link to="/signup" className="signup-link text-purple-600"> Signup</Link>
//                    </a>
//                </p>
//          </div>
//            <div>

//            </div>

//       </div>
         

         
        


//     </div>
//   </div>
// }
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Logo } from "../icons/Logo";
import { Signinlogo } from "../icons/Signin";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate, Link } from "react-router-dom";

export function Signin() {
  const [loading, setLoading] = useState(false);

  const useremailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const signin = async () => {
    const email = useremailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      alert("Your information is incorrect!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      });

      alert("Welcome! You are signed in now.");

      // Store token into localStorage
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

   
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      alert(err.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-purple-300 flex justify-center items-center">
      <div className="bg-gray-100 rounded-xl min-w-96 h-90 shadow-lg border p-6">
        {/* Logo */}
        <div className="flex gap-2 text-xl text-purple-500 justify-center items-center mb-6">
          <Logo />
          <b className="shadow rounded-md border px-2">CortexMark</b>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <Input reference={useremailRef} placeholder="Email" type="text" />
          <Input reference={passwordRef} placeholder="Password" type="password" />
        </div>


        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={signin}
            variant="primary"
            styleType="primarystyle"
            text="Signin"
            endIcon={<Signinlogo />}
            fullwidth={true}
            loading={loading}
          />

          <p className="text-sm mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-medium">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
