"use client"
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(()=>{
    const user =  localStorage.getItem("user");
    if(!user){
      router.push("/login");
    }
  },[])
    return (
      <>
        <Navbar/>
        {children}
      </>
    );
  }