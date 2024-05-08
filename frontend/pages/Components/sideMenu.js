export default function SideMenu() {

    return(
        <>
        <ul className="menu bg-neutral-200 w-56 ">
        <span className="block bg-primary-500 text-black  py-2 px-4 mb-4">
                    Nazmul Hasan
                </span>
            <li><a href="/">Home</a></li>

            {/* Appoinement */}
            <li>
                <details open>
                <summary>Appoinment</summary>
                <ul>
                    <li><a><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Schedule Appoinment</a></li>
                    <li><a><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Responded Appoinment</a></li>
                    <li>
                    </li>
                </ul>
                </details>
            </li>

            {/* E Service */}
            <li>
                <details open>
                <summary>E Service</summary>
                <ul>
                    <li><a><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Schedule Appoinment</a></li>
                    <li><a><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Responded Appoinment</a></li>
                    <li>
                    <details open>
                        <summary>Parent</summary>
                        <ul>
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                    </li>
                </ul>
                </details>
            </li>


            <li><a>Item 3</a></li>
            </ul>

        </>
    )
}