import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2 className="m-auto text-center">
                    {this.state.error.message || "Something went wrong!"}
                </h2>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
