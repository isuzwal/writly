import { Outlet } from "react-router"
import Nava from "../Pages/Nava";
import Section from "../Screen/Section";
function Layout(){
    return(
    <Section>
      <Nava />
      <Outlet />
    </Section>
    )
}
export default Layout;