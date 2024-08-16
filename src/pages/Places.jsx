import {Outlet, useNavigate} from "react-router-dom";
import {CustomNavbar} from "../components/CustomNavbar.jsx";
import '../styles/places.css'
import {TabsNav} from "../components/TabsNav.jsx";
import { Helmet } from 'react-helmet';


function Places() {
    const navigate = useNavigate()

    return(
        <>
            <Helmet>
                <title>Places</title>
                <meta name="description" content="All of your favorite places, in one place." />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <h1 className="w-1/2 m-auto mt-32 md:mt-10 text-center">
                All the places in my lists
            </h1>
            <div className="w-5/6 m-auto p-2 md:w-1/2">
                <TabsNav/>
            </div>
            <CustomNavbar/>

            <Outlet />
        </>
    )
}

export default Places
