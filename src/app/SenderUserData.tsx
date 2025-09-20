"use client"
import { authClient } from '@/lib/auth-client'
import { api } from '../../convex/_generated/api'
import { useMutation} from "convex/react"
import { useEffect } from 'react'


const SenderUserData = () => {
    const { data: session , error } = authClient.useSession()
    const SendingUsersData_toConvex = useMutation(api.storevector.storeUsersData)
    useEffect(()=>{
        if(session?.user.id){
            SendingUsersData_toConvex({
                UserID:session?.user.id,
                Email:session?.user.email,
                Name:session?.user.name,
            })
            console.log("Userdata sent to Convex DB ")
        }

    } , [session?.user.id])


  return null
}

export default SenderUserData
