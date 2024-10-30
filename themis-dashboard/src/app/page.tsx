"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

const LandingPage = () => {
  const [meetingLink, setMeetingLink] = useState("");
  const router = useRouter(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingLink(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    console.log("Meeting Link Submitted:", meetingLink);
  };

  
  const handleContinue = () => {
    router.push("/signup"); 
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black font-josefin">
    
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/landing_image.jpg')" }} 
      ></div>

     
      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
        <div className=" w-[950px] h-[620px] bg-black bg-opacity-50 rounded-[50px] ">
        
          <div className="relative z-10 text-center text-white p-8">
            <h1 className="text-[50px] mt-[100px] font-bold mb-6 leading-none">WELCOME TO THEMIS AI</h1>
            <p className="text-[40px] mb-10 leading-tight">
              Transcribe your meetings <br />
              <span>Effortlessly with us.</span>
            </p>

            
            {/* <form
              onSubmit={handleFormSubmit}
              className="flex items-center justify-center mb-6"
            >
              <div className="relative">
                <input
                  type="text"
                  value={meetingLink}
                  onChange={handleInputChange}
                  placeholder="Input meeting link"
                  className="mt-[1.5px] px-6 py-4 w-[600px] h-[59px] rounded-[10px] text-black focus:outline-none focus:border-green-500 text-[20px] pr-20"
                />
                <button
                  type="submit"
                  className="absolute inset-y-[0.5px] right-0 w-[150px] mr-[-2px] h-[60px] bg-black rounded-r-[10px] flex items-center justify-center hover:bg-gray-800 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </form> */}

           
            {/* <p className="text-2xl mb-4">Or</p> */}
            <button
              onClick={handleContinue}
              className="px-[100px] py-[15px] bg-white text-black font-semibold text-[25px] rounded-[15px] hover:bg-gray-200 transition duration-200"
            >
             
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
