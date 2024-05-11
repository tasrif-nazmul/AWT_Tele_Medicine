import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Navbar() {

  const router = useRouter();

    const handleLogout = () => 
      {
        // Clear authentication token
        Cookies.remove('access_token');
        // Redirect to login page
        router.push('/');
    };

    return(
        <>
        
<div className="navbar bg-neutral-100">
  <div className="flex-1">
    <a href="/" className="btn btn-ghost text-xl">Tele Medicine</a>
  </div>
  <div className="flex-none">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/NH.png" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a href="/doctor/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

        </>
    )
}