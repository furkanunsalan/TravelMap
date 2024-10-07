import { FaSpinner } from "react-icons/fa";

const Loading = ({variant}) => {

    if (variant == 1) {
        return (
            <div className="flex flex-col items-center justify-center h-screen ">
                <FaSpinner className="animate-spin mx-auto size-20" />
            </div>
        );
    }

    if (variant == 2) {
        return (
            <div className="flex flex-col items-center justify-center">
                <FaSpinner className="animate-spin mx-auto size-20" />
            </div>
        );
    }
    
};

export default Loading;
