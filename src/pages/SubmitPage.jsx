import CustomForm from "../components/CustomForm.jsx";
import {CustomNavbar} from "../components/CustomNavbar.jsx";
import { Helmet } from 'react-helmet';


function SubmitPlace() {
    return (
        <>
            <Helmet>
                <title>Submit Place</title>
                <meta name="description" content="Submit your favorite places for people to see"/>
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <div className="h-screen overflow-auto">
                <CustomNavbar />
                <CustomForm />
            </div>
        </>

    );
}

export default SubmitPlace;
