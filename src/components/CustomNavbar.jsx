import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    MenuItem,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import {
    Bars2Icon,
    MapIcon,
    HomeIcon,
    PhotoIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        to: "/",
    },
    {
        label: "Landmarks",
        icon: MapIcon,
        to: "/landmarks",
    },
];

function NavList() {
    const navigate = useNavigate();

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {/* <NavListMenu /> */}
            {navListItems.map(({ label, icon, to }, key) => (
                <Typography
                    key={label}
                    as="a"
                    variant="small"
                    color="black"
                    className="font-bold text-black"
                    onClick={to.startsWith("/") ? () => navigate(to) : null}
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, {
                            className: "h-[18px] w-[18px]",
                        })}{" "}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

export function CustomNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const navigate = useNavigate();

    const navigateSubmit = () => {
        navigate("/submit");
    };

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="fixed top-5 left-1/2 transform -translate-x-1/2 z-20 w-5/6 mx-auto max-w-screen-xl p-2 lg:pl-6">
            <div className="relative flex items-center justify-between w-full text-blue-gray-900">
                <Typography
                    as="a"
                    onClick={() => navigate("/")}
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
                >
                    Furkan Ünsalan
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="black"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                <Button
                    size="sm"
                    variant="filled"
                    onClick={navigateSubmit}
                    className="hover:shadow-none"
                >
                    <span>Submit</span>
                </Button>
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}
