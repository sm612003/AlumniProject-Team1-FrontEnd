import Newsletter from "../Pages/Newsletter/Newsletter";
// import BlogDetails from "./Components/BlogDetails/BlogDetailsComponent"
import HomePage from "../Pages/Home/Home";
import Blogs from "../Pages/Blogs/BlogsPage";
import BlogDetails from "../Pages/BlogsDetails/BlogsDetails";
import BlogForm from "../Pages/BlogsForm/BlogsForm";
import BlogUpdate from "../Pages/BlogsUpdate/BlogsUpdateForm";
import Contact from "../Pages/Contact/Contact";
import NewsLetterDetails from "../Pages/NewsletterDetails/NewsletterDetais";
import SubscribePage from "../Pages/Subscribe/Subscribe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Logo } from "../Components/Logo/Logo";
// import NotFound from "../Pages/NotFound/NotFound";
import NewsCategory from "../Pages/NewsCategory/NewsCategory";
import LayoutWithHeaderFooter from "./Layout";
import SignUpForm from "../Pages/SignUp/SignUpForm";
import Login from "../Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import TableUser from "../Components/ManageUser/ManageUserTable";
import ManageSubscUserTable from "../Components/ManageSubsUser/subscribeUser";
import LayoutWithHeaderSidebar from "./Layoutwithsidebar";
import ManageNewsTable from "../Components/ManageNewsTable/manageNews";
import ManageBlogTable from "../Components/ManageBLogs/ManageBLogs";
import Overview from "../Pages/Dashboard/Dashboard";
import { Navigate } from "react-router-dom";
import UsersPage from '../Pages/UsersWeb/UsersPage'
import ManageUserTable from "../Components/ManageUser/ManageUserTable";
import EditProfile from "../Components/editUserProfile/editUserProfile";// const Layout =()=>{
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [nav, setNav] = useState(screenWidth < 800 ? true : false)

//   useEffect(() => {
//     const handleResize = () => {
//       const newWidth = window.innerWidth;
//       setScreenWidth(newWidth);
//       setNav(newWidth < 800 ? true : false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return(
//   <>
//   {nav ? (
//     <HeaderMobile/>
//   ): (  <Header/>) }
//   <Outlet />
//   <Footer />
//   </>
//   )
// }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:<Layout />,
//     children:[
//       {
//         path:"/",
//         element:<HomePage/>
//       },
//       {
//         path: "/",
//         element: <Logo/>
//       },
//       {
//           path:"/newsletter",
//           element:<Newsletter />
//       },
//       {
//           path:"/newsletterDetails/:id",
//           element:<NewsLetterDetails />
//       },
//       {
//         path:"/newsCategory/:categoryName",
//         element:<NewsCategory />
//       },
//       {
//         path:"/contact",
//         element:<Contact />
//      },
//     {
//       path:"/blogsForm",
//       element:<BlogForm />
//   },
//   {
//     path:"/updateBlog/:id",
//     element:<BlogUpdate />
// },
// {
//   path:"/subscribe",
//   element:<SubscribePage />
// },
// {
//   path:"/blog",
//   element:<Blogs />
// },
// {
//   path:"/blogDetails/:id",
//   element:<BlogDetails />
// },
//     ]
//   },
//   {
//       path: "/dashboard",
//       element: <Dashboard />,
//     },{
//       path: "/*",
//       element : <NotFound/>
//     }
// ]);
// export default router
const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWithHeaderFooter>
              <HomePage />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/"
          element={
            <LayoutWithHeaderFooter>
              <Logo />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/newsletter"
          element={
            <LayoutWithHeaderFooter>
              {/* <Category /> */}
              <Newsletter />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/newsletterDetails/:id"
          element={
            <LayoutWithHeaderFooter>
              <NewsLetterDetails />
            </LayoutWithHeaderFooter>
          }
        />

        <Route
          path="/newsCategory/:categoryName"
          element={
            <LayoutWithHeaderFooter>
              {/* <Category /> */}
              <NewsCategory />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/contact"
          element={
            <LayoutWithHeaderFooter>
              <Contact />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/blogsForm"
          element={
            <LayoutWithHeaderFooter>
              <BlogForm />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/subscribe"
          element={
            <LayoutWithHeaderFooter>
              <SubscribePage />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/blogs"
          element={
            <LayoutWithHeaderFooter>
              <Blogs />
            </LayoutWithHeaderFooter>
          }
        />

        <Route
          path="/users"
          element={
            <LayoutWithHeaderFooter>
              <UsersPage />
            </LayoutWithHeaderFooter>
          }
        />
        <Route
          path="/blogDetails/:id"
          element={
            <LayoutWithHeaderFooter>
              <BlogDetails />
            </LayoutWithHeaderFooter>
          }
        />

        <Route
          path="/updateBlog/:id"
          element={
            <LayoutWithHeaderFooter>
              <BlogUpdate />
            </LayoutWithHeaderFooter>
          }
        />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
            <Overview/>
            <Navigate to="overview" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/overview"
          element={
            <LayoutWithHeaderSidebar>
              <Overview />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <LayoutWithHeaderSidebar>
              <TableUser />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/dashboard/subscuser"
          element={
            <LayoutWithHeaderSidebar>
              <ManageSubscUserTable />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/dashboard/news"
          element={
            <LayoutWithHeaderSidebar>
              <ManageNewsTable />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/dashboard/blogs"
          element={
            <LayoutWithHeaderSidebar>
              <ManageBlogTable />
            </LayoutWithHeaderSidebar>
          }
        />
        <Route
          path="/edituser/:id"
          element={
            <LayoutWithHeaderSidebar>
              <EditProfile />
            </LayoutWithHeaderSidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;

