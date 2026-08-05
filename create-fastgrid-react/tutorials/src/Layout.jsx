import { NavLink, Outlet } from "react-router-dom";
import { tutorialGroups } from "./List";
import "./Layout.css";

export default function Layout() {
   return (
      <div className="tutorial-layout">
      <aside className="tutorial-sidebar">
         <h2>FastGrid tutorials<br />React + Vite</h2>
         <nav className="tutorial-menu">
            {tutorialGroups.map((group) => (
            <section key={group.path} className="tutorial-group">
               <h3 className="tutorial-group-title">{group.title}</h3>
               <div className="tutorial-group-links">
                  {group.items.map((item) => (
                  <NavLink key={`${group.path}/${item.path}`} to={`${group.path}/${item.path}`} className={({ isActive }) => isActive ? "tutorial-link active" : "tutorial-link" }>
                     {item.title}
                  </NavLink>
                  ))}
               </div>
            </section>
            ))}
         </nav>
      </aside>

      <main className="tutorial-content Tutorial">
         <Outlet />
      </main>
      </div>
   );
}