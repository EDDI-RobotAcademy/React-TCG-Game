import { Outlet } from "react-router-dom";

export function UserLayout() {
    return (
        <>
        {/*    <Header />*/}
        {/*<Header2nd />*/}
        <Outlet />
        {/*<Footer />*/}
        </>
    );
}

export function AdminLayout() {
    return (
        <>
            <div className="admin-main-container">
        <div className="side-menu-container">
            {/*<Sidemenu />*/}
            </div>
            <div className="side-board-container">
        {/*<AdminHeader />*/}
        <Outlet />
        </div>
        </div>
        </>
);
}