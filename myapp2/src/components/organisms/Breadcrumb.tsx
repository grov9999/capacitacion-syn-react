import { HomeIcon } from "@heroicons/react/16/solid";
import { Link, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

export const Breadcrumb = () => {
    const location = useLocation();
    const { pathname } = location;

    if (pathname === "/") return null;

    const paths = pathname.split("/").filter(Boolean);

    return (
        <div className={`flex items-center py-4 my-6`}>
            <Link
                to="/"
                className="inline-flex items-center text-gray-400 hover:text-gray-500"
            >
                <span>
                    <HomeIcon className="w-5 h-5 mr-2" />
                </span>
                <span>{"Volver al inicio"}</span>
            </Link>
            {paths.map((path, index) => (
                <Fragment key={`${path}-${index}`}>
                    <span className="px-2">/</span>
                    <Link
                        to={"/" + paths.slice(0, index + 1).join("/")}
                        className={`inline-flex items-center capitalize ${index === paths.length - 1
                                ? "text-gray-500"
                                : "text-gray-400 hover:text-gray-500"
                            }`}
                    >
                        <span>{path}</span>
                    </Link>
                </Fragment>
            ))}
        </div>
    );
};
