import CustomForm from "../components/CustomForm.jsx";
import { CustomNavbar } from "../components/CustomNavbar.jsx";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer.jsx";

function SubmitPlace() {
    return (
        <>
            <Helmet>
                <title>Submit Place | Travel Map</title>
                <meta
                    name="description"
                    content="Submit your favorite places for people to see"
                />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <div className="h-screen overflow-auto">
                <CustomNavbar />
                <CustomForm />
                <Footer />
            </div>
        </>
    );
}

export default SubmitPlace;
