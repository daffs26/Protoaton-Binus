import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export function AppShell() {
  return (
    <>
      {/* page content fills remaining height; pages use screen-scroll inside */}
      <div style={{
        flex: 1,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}>
        <Outlet />
      </div>
      <BottomNav />
    </>
  );
}
