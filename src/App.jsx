import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Shared/Navbar";
import Sidebar from "./Components/Sidebar";
import Mail from "./Components/Mail";
import Inbox from "./Components/Inbox";
import SendMail from "./Components/SendMail";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Login"

const Layout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inbox />,
      },
      {
        path: "mail/:id",
        element: <Mail />,
      },
    ],
  },
]);

function App() {
  const User = useSelector(store => store.app.User);

  return (
    <div className="bg-[#F6F8FC] h-screen w-screen overflow-hidden">
      {!User ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <RouterProvider router={router} />
          <div className="absolute w-[43%] bottom-0 right-20 z-10">
            <SendMail />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
