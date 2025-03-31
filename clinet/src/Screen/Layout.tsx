import { Outlet } from "react-router"

function Layout(){
    return(
  <div className="min-h-screen  w-full ">
  <div>
      <Outlet />
  </div>
</div>
    )
}
export default Layout;