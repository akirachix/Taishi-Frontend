
// "use client";
// import React, { useState, useEffect } from "react";
// // import { fetchS3Files } from '@/app/utils/usefiles'; 
// // import { createTranscription } from '@/app/utils/transcription'; 
// import { Doughnut } from 'react-chartjs-2';

// import Layout from "../Layout";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { FaCalendar, FaClipboardCheck, FaClock, FaEdit} from 'react-icons/fa';
// import { fetchTranscribedCases } from '@/app/utils/useCases'; 

// ChartJS.register(ArcElement, Tooltip, Legend);

// const avatars = [
//   '/ladyjustice.png',
//   '/avatar1.png',
//   '/avatar2.png',
//   '/avatar3.png',
//   '/avatar4.png',
//   '/avatar5.png',
//   '/avatar7.png',
// ];

// interface JudgeProfile {
//   name: string;
//   email: string;
//   dateOfJoining: string;
//   transcribedCases: number;
//   totalCases: number; 
//   avatar: string;
// }
// interface TranscribedCasesResponse {
//   success: boolean;
//   transcribed_cases: Array<{
//     id: string;
//     title: string;
//   }>;
// }
// interface S3File {
//   filename: string;
// }

// const ProfilePage = () => {
//   const [judgeProfile, setJudgeProfile] = useState<JudgeProfile | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
//     return localStorage.getItem('avatar') || '/ladyjustice.png';
//   });
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [showModal, setShowModal] = useState(false);
//   const [caseName, setCaseName] = useState('');
//   const [caseNumber, setCaseNumber] = useState('');
//   const [audioFile, setAudioFile] = useState('');
//   const [s3Files, setS3Files] = useState<S3File[]>([]);
//   const [loadingFiles, setLoadingFiles] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiError, setApiError] = useState<string | null>(null);
//   const [transcribedCases, setTranscribedCases] = useState<TranscribedCasesResponse | null>(null);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const dummyData: JudgeProfile = {
//       name: "Amani Mwangi",
//       email: "amanimwangi@gmail.com",
//       dateOfJoining: "2021-01-15",
//       avatar: selectedAvatar,
//          };

//     setTimeout(() => {
//       setJudgeProfile(dummyData);
//       setLoading(false);
//     }, 1000);
//   }, [selectedAvatar]);

//   useEffect(() => {
//     localStorage.setItem('avatar', selectedAvatar);
//   }, [selectedAvatar]);

//   useEffect(() => {
//     const fetchCases = async () => {
//       try {
//         const data = await fetchTranscribedCases(); // Call your API here
//         setTranscribedCases(data); // Assuming data is an array of transcribed cases
//       } catch (error) {
//         setError(error as Error); // Handle the error
//       } finally {
//         setLoading(false); // Set loading to false once the fetching is done
//       }
//     };

//     fetchCases();
//   }, []); // Empty dependency array means this effect runs once on mount

  
//   useEffect(() => {
//     const loadS3Files = async () => {

//     if (showModal) {
//         setLoadingFiles(true);
//         try {
//           const files = await fetchS3Files();
//           setS3Files(files);
//         } catch (error) {
//           console.error("Error fetching S3 files:", error);
//           setApiError("Failed to load S3 files.");
//         } finally {
//           setLoadingFiles(false);
//         }
//       };
//       loadS3Files();
//     }
//   }, [showModal]);



 
//   const startNewTranscription = () => {
//     setShowModal(true);
//   };

//   const handleAddCaseAudio = async () => {
//     setIsSubmitting(true); // Set the isSubmitting state to true
//     setApiError(null); // Reset any previous errors
//     const transcriptionData = {
//         audio_file: audioFile,  
//         case_name: caseName,    
//         case_number: caseNumber 
//     };
//     try {
//         // Call the API to create a new transcription
//         await createTranscription(transcriptionData);
//         alert('Transcription process started successfully.');
//         setShowModal(false); // Close modal after adding the case
//     } catch (error) {
//         console.error('Error creating transcription:', error);
//         setApiError('Failed to create transcription.');  // Set the error message if there's an issue
//     } finally {
//         setIsSubmitting(false); // Reset the isSubmitting state
//     }
// };



//   const handleAvatarSelect = (avatar: string) => {
//     setSelectedAvatar(avatar);
//     localStorage.setItem('avatar', avatar);
//     setIsEditing(false);
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching cases: {error.message}</div>;
//   }

//   if (!judgeProfile) {
//     return <div>No profile found</div>;
//   }
  

//   const pendingCases = judgeProfile.totalCases - judgeProfile.transcribedCases;

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto p-6 bg-white text-black">
       
      

//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-20 justify-center">
//             <div className="bg-white p-8 rounded-md w-[400px]">
//               <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>
//               <div className="mb-4">
//                 <label className="block text-sm mb-2">Case Name</label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-md w-full px-3 py-2"
//                   value={caseName}
//                   onChange={(e) => setCaseName(e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm mb-2">Case Number</label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-md w-full px-3 py-2"
//                   value={caseNumber}
//                   onChange={(e) => setCaseNumber(e.target.value)}
//                   disabled={isSubmitting}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm mb-2">Audio File</label>
//                 {loadingFiles ? (
//                   <p>Loading files...</p>
//                 ) : (
//                   <select
//                     className="border border-gray-300 rounded-md w-full px-3 py-2"
//                     value={audioFile}
//                     onChange={(e) => setAudioFile(e.target.value)}
//                     disabled={isSubmitting || loadingFiles}
//                   >
//                     <option value="">Select an audio file</option>
//                     {s3Files.map((file, index) => (
//                       <option key={index} value={file.filename}>
//                         {file.filename}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>
//               {apiError && (
//                 <p className="text-red-600 text-sm mb-4">{apiError}</p>
//               )}
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className=" bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleAddCaseAudio}
//                   className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Transcribing Audio...' : 'Add Audio'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col nh:mt-[1%] nh:gap-6 mt-[0.5%] nh:ml-[-5%] ml-[-7%] mr-[-6%] md:flex-row gap-16">
//           {/* Profile Section */}
//           <div className="md:w-1/3 bg-white-900 nh:p-2 p-6 shadow-2xl rounded-lg" >
//             <div className="relative">
//               <img
//                 src={judgeProfile.avatar}
//                 alt="Judge Avatar"
//                 className="w-60 h-60 mt-2 nh:ml-[20%] nh:w-28 nh:h-28 ml-16  rounded-full border-2 mb-2 border-gray-300"
//               />
//              <button
//                   onClick={() => {
//                     setIsEditing(!isEditing);  
//                   }}
//                   className="absolute mt-[-8%] ml-[52%] bg-green-800 nh:p-1 nh:ml-[43%] rounded-lg p-2 text-white"
//                 >
//                   <FaEdit />
//                 </button>
//             </div>

//             <div className="text-center">
//               <div className="space-y-4 mt-[24%]">
//                 <h2 className="text-3xl nh:text-xl font-semibold">{judgeProfile.name}</h2>
//                 <p className="text-[16px] nh:text-sm ">{judgeProfile.email}</p>
//                 <p className="text-[16px] nh:text-sm">
//                   Joined on: {new Date(judgeProfile.dateOfJoining).toLocaleDateString()}
//                 </p>
//                 <p className="text-[16px] nh:text-sm">Transcribed Cases: {judgeProfile.transcribedCases}</p>
//               </div>
//             </div>
//             <p className="mt-20 nh:mt-10 text-center nh:text-sm">"The arc of the moral universe is long, but it bends toward justice." </p>
//             <p className="mt-4 nh:mt-2 text-center nh:text-sm">~Martin Luther King Jr</p>
          
//           </div>

//           {/* Case Information Section */}
//            <div className=" md:w-2/3">
//   <div className="grid grid-cols-2  gap-4 mb-6">
//     <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48  flex flex-col items-center justify-center relative overflow-hidden">
 
//       <div className="relative mb-8 z-10 text-center">
//         <FaClipboardCheck className="nh:mt-6  w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
//         <h3 className="text-lg font-semibold mb-2">Transcribed Cases</h3>

      
// {transcribedCases && transcribedCases.transcribed_cases ? (
//   transcribedCases.transcribed_cases.map((caseItem) => (
//     <div key={caseItem.id}>{caseItem.title}</div>
//   ))
// ) : (
//   <p className="text-3xl nh:text-xl mt-4 font-bold">
//   {transcribedCases?.transcribed_cases?.length || 0}
// </p>

// )}
//       </div>
//     </div>


//     <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48 flex flex-col items-center justify-center relative overflow-hidden">
     
//       <div className="relative mb-8 z-10 text-center">
//         <FaClock className="nh:mt-6  w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
//         <h3 className="text-lg  font-semibold mb-2">Pending Cases</h3>
//         <p className="text-3xl nh:text-xl mt-4 font-bold">{pendingCases}</p>
//       </div>
//     </div>


// {/* <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
//       <h3 className="text-xl font-semibold mb-4">Total Transcribed Cases</h3>
//       <div className="relative flex justify-center items-center">
//         <Doughnut data={data} options={options} className="h-40 w-40" />
//         <div className="absolute text-center">
         
//           <p className="text-sm text-gray-600">Cases</p>
//         </div>
//       </div>
//     </div> */}

//   </div> 
       

//             {/* Recent Cases */}
//              <div className="bg-white-900 mt-10  shadow-2xl nh:p-1 nh:w-[95%] rounded-lg p-8">
//               <h3 className="text-lg font-semibold nh:mb-2 mb-6">Recent Cases</h3>
//               <ul>
//                 <li className="border-b py-4">
//                   <div className="flex nh:text-[12px] justify-between items-center">
//                     <div>
//                       <h4 className="font-medium">Case: **State vs. John Doe**</h4>
//                       <p className="text-sm text-gray-600">Date: 10/03/2024</p>
//                     </div>
//                     <span className="text-green-600 font-semibold">Transcribed</span>
//                   </div>
//                 </li>

//                 <li className="border-b py-4">
//                   <div className="flex nh:text-[12px] justify-between items-center">
//                     <div>
//                       <h4 className="font-medium">Case: **Smith vs. Company ABC**</h4>
//                       <p className="text-sm text-gray-600">Date: 09/29/2024</p>
//                     </div>
//                     <span className="text-green-600 font-semibold">Transcribed</span>
//                   </div>
//                 </li>
//                 <li className="py-4">
//                   <div className="flex nh:text-[12px] justify-between items-center">
//                     <div>
//                       <h4 className="font-medium">Case: **People vs. Jane Smith**</h4>
//                       <p className="text-sm text-gray-600">Date: 09/21/2024</p>
//                     </div>
//                     <span className="text-yellow-600 font-semibold">Pending</span>
//                   </div>
//                 </li>
//               </ul>
//             </div>

//             {/* Quick Action Button */}
//             <div className={`mt-8 p-6 nh:mt-[-8%] rounded-lg`}>
//             <button
//           onClick={startNewTranscription}
//          className="mt-4 nh:ml-[-2%] w-full bg-green-700 text-white py-4 px-4 nh:p-2 rounded hover:bg-green-800 transition-colors"
//         >Start New Transcription
//         </button>    
//              </div>
//           </div>
//         </div>

//         {/* Avatar Selection Modal */}
//         {isEditing && (
//           <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-70">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h3 className="text-lg font-medium mb-8">Select an Avatar</h3>
//               <div className="flex gap-4">
//                 {avatars.map((avatar) => (
//                   <div key={avatar} className="cursor-pointer">
//                     <img
//                       src={avatar}
//                       alt="Avatar"
//                       className="w-24 h-24 rounded-full border-2 border-black"
//                       onClick={() => handleAvatarSelect(avatar)}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="mt-10 px-4 text-white py-2 bg-red-600 rounded-md hover:bg-red-500"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//         </div>
//     </Layout>
//   );
// };
// export default ProfilePage;






// "use client";
// import React, { useState, useEffect } from "react";
// // import { fetchS3Files } from '@/app/utils/usefiles';
// import { createTranscription } from '@/app/utils/transcription';
// import { Doughnut } from 'react-chartjs-2';


// import Layout from "../Layout";
// import {
//  Chart as ChartJS,
//  ArcElement,
//  Tooltip,
//  Legend,
// } from "chart.js";
// import { FaCalendar, FaClipboardCheck, FaClock, FaEdit} from 'react-icons/fa';
// import { fetchTranscribedCases } from '@/app/utils/useCases';


// ChartJS.register(ArcElement, Tooltip, Legend);


// const avatars = [
//  '/ladyjustice.png',
//  '/avatar1.png',
//  '/avatar2.png',
//  '/avatar3.png',
//  '/avatar4.png',
//  '/avatar5.png',
//  '/avatar7.png',
// ];


// interface JudgeProfile {
//  name: string;
//  email: string;
//  dateOfJoining: string;
//  transcribedCases: number;
//  totalCases: number;
//  avatar: string;
// }
// interface TranscribedCasesResponse {
//  success: boolean;
//  transcribed_cases: Array<{
//    id: string;
//    title: string;
//  }>;
// }




// const ProfilePage = () => {
//  const [judgeProfile, setJudgeProfile] = useState<JudgeProfile | null>(null);
//  const [loading, setLoading] = useState<boolean>(true);
//  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
//    return localStorage.getItem('avatar') || '/ladyjustice.png';
//  });
//  const [isEditing, setIsEditing] = useState<boolean>(false);
//  const [showModal, setShowModal] = useState(false);
//  const [caseName, setCaseName] = useState('');
//  const [caseNumber, setCaseNumber] = useState('');
//  // const [audioFile, setAudioFile] = useState('');
//  // const [s3Files, setS3Files] = useState<S3File[]>([]);
//  const [loadingFiles, setLoadingFiles] = useState(false);
//  const [isSubmitting, setIsSubmitting] = useState(false);
//  const [apiError, setApiError] = useState<string | null>(null);
//  const [transcribedCases, setTranscribedCases] = useState<TranscribedCasesResponse | null>(null);
//  const [error, setError] = useState<Error | null>(null);
//  const [audioFile, setAudioFile] = useState<File | null>(null); // Store the local file
//  const [uploadStatus, setUploadStatus] = useState<string | null>(null); // To track the status of the upload


//  useEffect(() => {
//    const dummyData: JudgeProfile = {
//      name: "Amani Mwangi",
//      email: "amanimwangi@gmail.com",
//      dateOfJoining: "2021-01-15",
//      avatar: selectedAvatar,
//         };


//    setTimeout(() => {
//      setJudgeProfile(dummyData);
//      setLoading(false);
//    }, 1000);
//  }, [selectedAvatar]);


//  useEffect(() => {
//    localStorage.setItem('avatar', selectedAvatar);
//  }, [selectedAvatar]);


//  useEffect(() => {
//    const fetchCases = async () => {
//      try {
//        const data = await fetchTranscribedCases(); // Call your API here
//        setTranscribedCases(data); // Assuming data is an array of transcribed cases
//      } catch (error) {
//        setError(error as Error); // Handle the error
//      } finally {
//        setLoading(false); // Set loading to false once the fetching is done
//      }
//    };


//    fetchCases();
//  }, []); // Empty dependency array means this effect runs once on mount


//   // useEffect(() => {
//  //   const loadS3Files = async () => {


//  //   if (showModal) {
//  //       setLoadingFiles(true);
//  //       try {
//  //         const files = await fetchS3Files();
//  //         setS3Files(files);
//  //       } catch (error) {
//  //         console.error("Error fetching S3 files:", error);
//  //         setApiError("Failed to load S3 files.");
//  //       } finally {
//  //         setLoadingFiles(false);
//  //       }
//  //     };
//  //     loadS3Files();
//  //   }
//  // }, [showModal]);


//  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    if (e.target.files && e.target.files.length > 0) {
//      setAudioFile(e.target.files[0]);
//    }
//  };


//  const startNewTranscription = () => {
//    setShowModal(true);
//  };
//  const handleAddCaseAudio = async () => {
//    if (!audioFile) {
//      setApiError("Please select an audio file.");
//      return;
//    }


//    setIsSubmitting(true);
//    setApiError(null);


//    try {
  
//      const response = await fetchWithTimeout(createTranscription(audioFile, caseName, caseNumber), 300000); // 300000ms = 5 minutes timeout
//      alert('Transcription process started successfully.');
//      setUploadStatus(`Upload successful! Transcription ID: ${response.id}`);
//      setShowModal(false)
//    } catch (error) {
//      console.error('Error creating transcription:', error);
//      setApiError('Failed to create transcription.');
//    } finally {
//      setIsSubmitting(false);
//    }
//  };
//  const fetchWithTimeout = (promise: Promise<any>, timeout: number): Promise<any> => {
//    return new Promise((resolve, reject) => {
//      const timer = setTimeout(() => {
//        reject(new Error('Request timed out'));
//      }, timeout);


//      promise
//        .then((res) => {
//          clearTimeout(timer);
//          resolve(res);
//        })
//        .catch((err) => {
//          clearTimeout(timer);
//          reject(err);
//        });
//    });
//  };




//  const handleAvatarSelect = (avatar: string) => {
//    setSelectedAvatar(avatar);
//    localStorage.setItem('avatar', avatar);
//    setIsEditing(false);
//  };
//  if (loading) {
//    return <div>Loading...</div>;
//  }


//  if (error) {
//    return <div>Error fetching cases: {error.message}</div>;
//  }


//  if (!judgeProfile) {
//    return <div>No profile found</div>;
//  }


//  const pendingCases = judgeProfile.totalCases - judgeProfile.transcribedCases;


//  return (
//    <Layout>
//      <div className="max-w-6xl mx-auto p-6 bg-white text-black">
     
    


//      {showModal && (
//          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//            <div className="bg-white p-8 rounded-md w-[400px] relative">
//              <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>


//              {/* Close button (X) */}
//              <button
//                onClick={() => setShowModal(false)} 
//                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//              >
//                <svg
//                  xmlns="http://www.w3.org/2000/svg"
//                  className="h-6 w-6"
//                  fill="none"
//                  viewBox="0 0 24 24"
//                  stroke="currentColor"
//                  strokeWidth={2}
//                >
//                  <path
//                    strokeLinecap="round"
//                    strokeLinejoin="round"
//                    d="M6 18L18 6M6 6l12 12"
//                  />
//                </svg>
//              </button>


//              {/* Case Name Input */}
//              <div className="mb-4">
//                <label className="block text-sm mb-2">Case Name</label>
//                <input
//                  type="text"
//                  className="border border-gray-300 rounded-md w-full px-3 py-2"
//                  value={caseName}
//                  onChange={(e) => setCaseName(e.target.value)}
//                  disabled={isSubmitting} // Disable input during submission
//                />
//              </div>


//              {/* Case Number Input */}
//              <div className="mb-4">
//                <label className="block text-sm mb-2">Case Number</label>
//                <input
//                  type="text"
//                  className="border border-gray-300 rounded-md w-full px-3 py-2"
//                  value={caseNumber}
//                  onChange={(e) => setCaseNumber(e.target.value)}
//                  disabled={isSubmitting} // Disable input during submission
//                />
//              </div>


//              {/* Audio File Input */}
//              <div className="mb-4">
//                <label className="block text-sm mb-2">Audio File</label>
//                <input
//                  type="file"
//                  className="border border-gray-300 rounded-md w-full px-3 py-2"
//                  onChange={handleFileChange}
//                  disabled={isSubmitting} // Disable input during submission
//                />
//              </div>


//              {/* Display API error if it exists */}
//              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
//              {uploadStatus && <p className="text-green-500 text-sm mb-4">{uploadStatus}</p>}


//              <div className="flex justify-end space-x-4">
//                <button
//                  onClick={() => setShowModal(false)}  // Close the modal
//                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
//                  disabled={isSubmitting} // Disable cancel button during submission
//                >
//                  Close
//                </button>
//                <button
//                  onClick={handleAddCaseAudio}
//                  className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${
//                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                  }`}
//                  disabled={isSubmitting} // Disable button during submission
//                >
//                  {isSubmitting ? 'Transcribing Audio...' : 'Add Audio'}
//                </button>
//              </div>
//            </div>
//          </div>
//        )}


//        <div className="flex flex-col nh:mt-[1%] nh:gap-6 mt-[0.5%] nh:ml-[-5%] ml-[-7%] mr-[-6%] md:flex-row gap-16">
//          {/* Profile Section */}
//          <div className="md:w-1/3 bg-white-900 nh:p-2 p-6 shadow-2xl rounded-lg" >
//            <div className="relative">
//              <img
//                src={judgeProfile.avatar}
//                alt="Judge Avatar"
//                className="w-60 h-60 mt-2 nh:ml-[20%] nh:w-28 nh:h-28 ml-16  rounded-full border-2 mb-2 border-gray-300"
//              />
//             <button
//                  onClick={() => {
//                    setIsEditing(!isEditing); 
//                  }}
//                  className="absolute mt-[-8%] ml-[52%] bg-green-800 nh:p-1 nh:ml-[43%] rounded-lg p-2 text-white"
//                >
//                  <FaEdit />
//                </button>
//            </div>


//            <div className="text-center">
//              <div className="space-y-4 mt-[24%]">
//                <h2 className="text-3xl nh:text-xl font-semibold">{judgeProfile.name}</h2>
//                <p className="text-[16px] nh:text-sm ">{judgeProfile.email}</p>
//                <p className="text-[16px] nh:text-sm">
//                  Joined on: {new Date(judgeProfile.dateOfJoining).toLocaleDateString()}
//                </p>
//                <p className="text-[16px] nh:text-sm">Transcribed Cases: {judgeProfile.transcribedCases}</p>
//              </div>
//            </div>
//            <p className="mt-20 nh:mt-10 text-center nh:text-sm">"The arc of the moral universe is long, but it bends toward justice." </p>
//            <p className="mt-4 nh:mt-2 text-center nh:text-sm">~Martin Luther King Jr</p>
        
//          </div>


//          {/* Case Information Section */}
//           <div className=" md:w-2/3">
//  <div className="grid grid-cols-2  gap-4 mb-6">
//    <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48  flex flex-col items-center justify-center relative overflow-hidden">
//      <div className="relative mb-8 z-10 text-center">
//        <FaClipboardCheck className="nh:mt-6  w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
//        <h3 className="text-lg font-semibold mb-2">Transcribed Cases</h3>


    
// {transcribedCases && transcribedCases.transcribed_cases ? (
//  transcribedCases.transcribed_cases.map((caseItem) => (
//    <div key={caseItem.id}>{caseItem.title}</div>
//  ))
// ) : (
//  <p className="text-3xl nh:text-xl mt-4 font-bold">
//  {transcribedCases?.transcribed_cases?.length || 0}
// </p>


// )}
//      </div>
//    </div>




//    <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48 flex flex-col items-center justify-center relative overflow-hidden">
   
//      <div className="relative mb-8 z-10 text-center">
//        <FaClock className="nh:mt-6  w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
//        <h3 className="text-lg  font-semibold mb-2">Pending Cases</h3>
//        <p className="text-3xl nh:text-xl mt-4 font-bold">{pendingCases}</p>
//      </div>
//    </div>




// {/* <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
//      <h3 className="text-xl font-semibold mb-4">Total Transcribed Cases</h3>
//      <div className="relative flex justify-center items-center">
//        <Doughnut data={data} options={options} className="h-40 w-40" />
//        <div className="absolute text-center">
       
//          <p className="text-sm text-gray-600">Cases</p>
//        </div>
//      </div>
//    </div> */}


//  </div>
     


//            {/* Recent Cases */}
//             <div className="bg-white-900 mt-10  shadow-2xl nh:p-1 nh:w-[95%] rounded-lg p-8">
//              <h3 className="text-lg font-semibold nh:mb-2 mb-6">Recent Cases</h3>
//              <ul>
//                <li className="border-b py-4">
//                  <div className="flex nh:text-[12px] justify-between items-center">
//                    <div>
//                      <h4 className="font-medium">Case: **State vs. John Doe**</h4>
//                      <p className="text-sm text-gray-600">Date: 10/03/2024</p>
//                    </div>
//                    <span className="text-green-600 font-semibold">Transcribed</span>
//                  </div>
//                </li>


//                <li className="border-b py-4">
//                  <div className="flex nh:text-[12px] justify-between items-center">
//                    <div>
//                      <h4 className="font-medium">Case: **Smith vs. Company ABC**</h4>
//                      <p className="text-sm text-gray-600">Date: 09/29/2024</p>
//                    </div>
//                    <span className="text-green-600 font-semibold">Transcribed</span>
//                  </div>
//                </li>
//                <li className="py-4">
//                  <div className="flex nh:text-[12px] justify-between items-center">
//                    <div>
//                      <h4 className="font-medium">Case: **People vs. Jane Smith**</h4>
//                      <p className="text-sm text-gray-600">Date: 09/21/2024</p>
//                    </div>
//                    <span className="text-yellow-600 font-semibold">Pending</span>
//                  </div>
//                </li>
//              </ul>
//            </div>


//            {/* Quick Action Button */}
//            <div className={`mt-8 p-6 nh:mt-[-8%] rounded-lg`}>
//            <button
//          onClick={startNewTranscription}
//         className="mt-4 nh:ml-[-2%] w-full bg-green-700 text-white py-4 px-4 nh:p-2 rounded hover:bg-green-800 transition-colors"
//        >Start New Transcription
//        </button>   
//             </div>
//          </div>
//        </div>


//        {/* Avatar Selection Modal */}
//        {isEditing && (
//          <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-70">
//            <div className="bg-white p-8 rounded-lg shadow-lg">
//              <h3 className="text-lg font-medium mb-8">Select an Avatar</h3>
//              <div className="flex gap-4">
//                {avatars.map((avatar) => (
//                  <div key={avatar} className="cursor-pointer">
//                    <img
//                      src={avatar}
//                      alt="Avatar"
//                      className="w-24 h-24 rounded-full border-2 border-black"
//                      onClick={() => handleAvatarSelect(avatar)}
//                    />
//                  </div>
//                ))}
//              </div>
//              <button
//                onClick={() => setIsEditing(false)}
//                className="mt-10 px-4 text-white py-2 bg-red-600 rounded-md hover:bg-red-500"
//              >
//                Cancel
//              </button>
//            </div>
//          </div>
//        )}
//        </div>
//    </Layout>
//  );
// };
// export default ProfilePage;


"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import Layout from "../Layout";
import { FaCalendar, FaClipboardCheck, FaClock, FaEdit } from 'react-icons/fa';
import { fetchTranscribedCases } from '@/app/utils/useCases';
import { createTranscription } from '@/app/utils/transcription';

interface JudgeProfile {
  name: string;
  email: string;
  dateOfJoining: string;
  transcribedCases: number;
  totalCases: number;
  avatar: string;
}

interface TranscriptionCounts {
  completed: number;
  pending: number;
}

const avatars = [
  '/ladyjustice.png',
  '/avatar1.png',
  '/avatar2.png',
  '/avatar3.png',
  '/avatar4.png',
  '/avatar5.png',
  '/avatar7.png',
];

const ProfilePage = () => {
  const [judgeProfile, setJudgeProfile] = useState<JudgeProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem('avatar') || '/ladyjustice.png';
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [caseName, setCaseName] = useState('');
  const [caseNumber, setCaseNumber] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [transcriptionCounts, setTranscriptionCounts] = useState<TranscriptionCounts | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  useEffect(() => {
    const dummyData: JudgeProfile = {
      name: "Amani Mwangi",
      email: "amanimwangi@gmail.com",
      dateOfJoining: "2021-01-15",
      avatar: selectedAvatar,
      transcribedCases: 14,
      totalCases: 20,
    };

    setTimeout(() => {
      setJudgeProfile(dummyData);
      setLoading(false);
    }, 1000);
  }, [selectedAvatar]);

  useEffect(() => {
    localStorage.setItem('avatar', selectedAvatar);
  }, [selectedAvatar]);

  // Fetch transcribed and pending case counts from the API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/transcriptions/transcription_status_counts'); // Verify the correct endpoint
        const textResponse = await response.text(); // Get the raw response as text
        console.log('Raw response:', textResponse); // Log the raw response
        const data = JSON.parse(textResponse); // Attempt to parse as JSON
        setTranscriptionCounts({
          completed: data.completed,
          pending: data.pending,
        });
      } catch (error) {
        setError(error as Error); // Handle the error
      } finally {
        setLoading(false); // Set loading to false once the fetching is done
      }
    };

    fetchCases();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  const startNewTranscription = () => {
    setShowModal(true);
  };

  const handleAddCaseAudio = async () => {
    if (!audioFile) {
      setApiError("Please select an audio file.");
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      const response = await fetchWithTimeout(createTranscription(audioFile, caseName, caseNumber), 300000); // 300000ms = 5 minutes timeout
      alert('Transcription process started successfully.');
      setUploadStatus(`Upload successful! Transcription ID: ${response.id}`);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating transcription:', error);
      setApiError('Failed to create transcription.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchWithTimeout = (promise: Promise<any>, timeout: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);

      promise
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    localStorage.setItem('avatar', avatar);
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cases: {error.message}</div>;
  }

  if (!judgeProfile || !transcriptionCounts) {
    return <div>No profile or transcription data available</div>;
  }

  const pendingCases = judgeProfile.totalCases - judgeProfile.transcribedCases;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 bg-white text-black">

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-[400px] relative">
              <h2 className="text-lg font-semibold mb-4">Add Case Audio</h2>

              {/* Close button (X) */}
              <button
                onClick={() => setShowModal(false)} 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Case Name Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseName}
                  onChange={(e) => setCaseName(e.target.value)}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Case Number Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Case Number</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Audio File Input */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Audio File</label>
                <input
                  type="file"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                  onChange={handleFileChange}
                  disabled={isSubmitting} // Disable input during submission
                />
              </div>

              {/* Display API error if it exists */}
              {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
              {uploadStatus && <p className="text-green-500 text-sm mb-4">{uploadStatus}</p>}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}  // Close the modal
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  disabled={isSubmitting} // Disable cancel button during submission
                >
                  Close
                </button>
                <button
                  onClick={handleAddCaseAudio}
                  className={`bg-yellow-500 text-white px-4 py-2 rounded-md ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting} // Disable button during submission
                >
                  {isSubmitting ? 'Transcribing Audio...' : 'Add Audio'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col nh:mt-[1%] nh:gap-6 mt-[0.5%] nh:ml-[-5%] ml-[-7%] mr-[-6%] md:flex-row gap-16">
          {/* Profile Section */}
          <div className="md:w-1/3 bg-white-900 nh:p-2 p-6 shadow-2xl rounded-lg">
            <div className="relative">
              <img
                src={judgeProfile.avatar}
                alt="Judge Avatar"
                className="w-60 h-60 mt-2 nh:ml-[20%] nh:w-28 nh:h-28 ml-16  rounded-full border-2 mb-2 border-gray-300"
              />
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                className="absolute mt-[-8%] ml-[52%] bg-green-800 nh:p-1 nh:ml-[43%] rounded-lg p-2 text-white"
              >
                <FaEdit />
              </button>
            </div>

            <div className="text-center">
              <div className="space-y-4 mt-[24%]">
                <h2 className="text-3xl nh:text-xl font-semibold">{judgeProfile.name}</h2>
                <p className="text-[16px] nh:text-sm ">{judgeProfile.email}</p>
                <p className="text-[16px] nh:text-sm">
                  Joined on: {new Date(judgeProfile.dateOfJoining).toLocaleDateString()}
                </p>
                <p className="text-[16px] nh:text-sm">Transcribed Cases: {judgeProfile.transcribedCases}</p>
              </div>
            </div>
          </div>

          {/* Case Information Section */}
          <div className="md:w-2/3">
            <div className="grid grid-cols-2  gap-4 mb-6">
              {/* Transcribed Cases Card */}
              <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative mb-8 z-10 text-center">
                  <FaClipboardCheck className="nh:mt-6  w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Transcribed Cases</h3>
                  <p className="text-3xl nh:text-xl mt-4 font-bold">{transcriptionCounts.completed}</p>
                </div>
              </div>

              {/* Pending Cases Card */}
              <div className="bg-green-200 shadow-2xl rounded-lg nh:p-1 nh:h-36 nh:w-56 p-4 py-28 h-48 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="relative mb-8 z-10 text-center">
                  <FaClock className="nh:mt-6 w-12 h-12 nh:w-6 nh:h-6 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Pending Cases</h3>
                  <p className="text-3xl nh:text-xl mt-4 font-bold">{transcriptionCounts.pending}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Selection Modal */}
        {isEditing && (
          <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-70">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-8">Select an Avatar</h3>
              <div className="flex gap-4">
                {avatars.map((avatar) => (
                  <div key={avatar} className="cursor-pointer">
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full border-2 border-black"
                      onClick={() => handleAvatarSelect(avatar)}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-10 px-4 text-white py-2 bg-red-600 rounded-md hover:bg-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;

