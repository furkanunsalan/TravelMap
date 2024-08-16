import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


function ErrorPage() {
    return (
        <>
            <Helmet>
                <title>Not Found</title>
                <meta name="description" content="This page does not exists!" />
                <meta name="keywords" content="React, Vite, Metadata" />
            </Helmet>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
                <div className="max-w-md text-center">
                    <h1 className="text-5xl font-extrabold text-red-600">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
                    <p className="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
                    <div className="mt-8">
                        <Link to="/" className="inline-block px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out">
                            Go to Homepage
                        </Link>
                        <Link to="/places" className="inline-block px-6 py-3 ml-4 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out">
                            View Places
                        </Link>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ErrorPage;
