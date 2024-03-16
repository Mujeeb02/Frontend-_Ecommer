import { useState } from "react"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
const user={_id:"adsfdgfh",role:""}
const Header = () => {
    const[isopen,setIsOpen]=useState<boolean>(false);
    function logoutHandler(){
        setIsOpen(false);
    }
  return (
    <nav className="header">
        <Link onClick={()=>setIsOpen(false)} to="/">
            Home
        </Link>
        <Link onClick={()=>setIsOpen(false)} to="/search">
            <FaSearch/>
        </Link>
        <Link onClick={()=>setIsOpen(false)} to="/cart">
            <FaShoppingBag/>
        </Link>
        {
            user?._id?(
                <>
                <button onClick={()=>setIsOpen((prev)=>!prev)}>
                    <FaUser/>
                </button>
                <dialog open={isopen}>
                    <div>
                        {user.role==="admin" && <Link to="/admin/dashboard">Admin</Link>}
                        <Link to="/orders">Orders</Link>
                        <button onClick={logoutHandler}><FaSignOutAlt/></button>
                    </div>
                </dialog>
                </>
            ):<Link to="/login">
            <FaSignInAlt/>
        </Link>
        }
    </nav>
  )
}

export default Header
