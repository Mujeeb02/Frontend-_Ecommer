import { useState } from "react"
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const[gender,setGender]=useState("");
    const[dob,setDob]=useState("");
  return (
    <div className="login">
      <main>
        <h1 className="heading">Login Here</h1>
        <div>
            <label>Gender</label>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div>
            <label >Date Of Birth</label>
            <input type="date"  value={dob} onChange={(e)=>setDob(e.target.value)}/>
        </div>
        <div>
            <p>Already Signed In Once</p>
            <button>
                <FcGoogle /> <span>Sign In with Google</span>
            </button>
        </div>
      </main>

    </div>
  )
}

export default Login
