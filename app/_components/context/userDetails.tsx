// 'use client';
// import { Get } from "@/lib/action/_get";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { createContext, useContext, useState } from "react";

// const UserDetails = createContext({});

// export const UserDetailsProvider = ({children}:{children: React.ReactNode}) =>{
//     const [userDetails , setUserDetails] = useState({});
//     const { user } = useUser();
//     const email = user?.primaryEmailAddress?.emailAddress;
//     const router = useRouter();

//     const getUserDetails = async () => {
//         if (!email) return;

//         const dbUser = await Get.UserByEmail(email);
        
//         if (!dbUser){
//             router.push("/user-sign-up");
//             return;
//         }

//         setUserDetails(dbUser);
//     }


//     return (
//         <UserDetails.Provider value={{userDetails}}>
//             {children}
//         </UserDetails.Provider>
//     )
// }

// export const useUserDetails = () => {
//     const details = useContext(UserDetails);
//     if (!details) {
//         throw new Error("useUserDetails must be used within a UserDetailsProvider");
//     }
//     return details;
// }