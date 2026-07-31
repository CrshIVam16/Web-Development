import { Link, Outlet } from "react-router-dom"
import InPageNavigation from "./InPageNavigation"

function Navbar() {
    return (
        <div className="w-full lg:w-[50%]">
            <InPageNavigation teams={[{ title: "Matches", path: "/" },
            { title: "News", path: "/news" },
            { title: "Table", path: "/pointsTable" }]}>
            </InPageNavigation>
            <Outlet />
        </div>
    )
}

export default Navbar