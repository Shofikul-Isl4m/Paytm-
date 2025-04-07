"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";



export async function createOnRampTransaction (amount : number , provider :string){

   const session = await getServerSession (authOptions);
   const userId = Number(session?.user?.id);
   const token = Math.random().toString();
   if (!userId){
     throw new Error("User not found");
   }
   await prisma.onRampTransaction.create (
    {
        data :{
            userId,
            amount ,
            token,
            provider,
            status : "Processing",
            startTime : new Date(),
        }
    }


   ) 
   return {
    message : "transaction added"
   }





}