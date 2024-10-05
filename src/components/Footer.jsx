import { Typography } from "@material-tailwind/react";
import logo from "/icon.png";

export default function Footer() {
    return (
        <footer className="w-full bg-white p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <img src={logo} alt="logo-ct" className="w-10 rounded" />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as="a"
                            href="/"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-gray-600"
                        >
                            Home
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="/landmarks"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-gray-600"
                        >
                            Places
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="/submit"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-gray-600"
                        >
                            Submit
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="https://github.com/furkanunsalan/TravelMap"
                            target="blank"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-gray-600"
                        >
                            Contribute
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2024{" "}
                <a
                    href="https://furkanunsalan.dev"
                    target="blank"
                    className="font-bold"
                >
                    Furkan Ünsalan
                </a>
            </Typography>
        </footer>
    );
}
