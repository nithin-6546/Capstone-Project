import axios from "axios";
import {create} from "zustand"

export const useAuth=create((set)=>({
    currentUser:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    login:async (userCredWithRole)=>{
        let {role,...userCredObj}=userCredWithRole
        try{
            //set loading true
            set({loading:true,error:null});

            //make api call
            let res=await axios.post("http://localhost:3000/common-api/authenticate",userCredObj,
                {withCredentials:true}
            )
            console.log("res is",res);
            //update state
            set({
                loading:false,
                isAuthenticated:true,
                currentUser:res.data.payload
            });
        }catch(err){
            console.log("err is",err);
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
                error:(err.response?.data?.error || "Login failed")
            })
        }
    },
    logout:async ()=>{
       try{
            //set loading true
            set({loading:true,error:null});

            //make api call
            let res=await axios.get("http://localhost:3000/common-api/logout",
                {withCredentials:true}
            )
            console.log("res is",res);
            //update state
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null
            });
        }catch(err){
            console.log("err is",err);
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
                error:(err.response?.data?.error || "Logout failed")
            })
        
    }
    },
    checkAuth:async()=>{
        try{
            //set loading true
            set(
                {
                    loading:true,
                    error:null});
            //make api call
            let res=await axios.get("http://localhost:3000/common-api/check-auth",
                {withCredentials:true}
            )
            console.log("res is",res);
            //update state
            set({
                loading:false,
                isAuthenticated:true,
                currentUser:res.data.payload
            });
        }catch(err){
            console.log("err is",err);
            set({
                loading:false,
                isAuthenticated:false,
                currentUser:null,
                error:(err.response?.data?.error || "Check auth failed")
            })
        }
    }
}))