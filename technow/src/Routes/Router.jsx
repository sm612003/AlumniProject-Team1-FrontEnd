import Newsletter from '../Pages/Newsletter/Newsletter';
// import BlogDetails from "./Components/BlogDetails/BlogDetailsComponent"
import Header from "../Layouts/Header/Header"
import Footer from "../Layouts/Footer/Footer"
import HomePage from "../Pages/Home/Home"
import Blogs from "../Pages/Blogs/BlogsPage"
import {BlogDetails} from '../Pages/BlogsDetails/BlogsDetails';
import BlogForm from "../Pages/BlogsForm/BlogsForm"
import BlogUpdate from '../Pages/BlogsUpdate/BlogsUpdateForm'
import Contact from "../Pages/Contact/Contact"
import Dashboard from "../Pages/Dashboard/Dashboard"
import NewsForm from "../Pages/NewsForm/NewsForm"
import NewsLetterDetails from "../Pages/NewsletterDetails/NewsletterDetais"
import NewsUpdate from "../Pages/NewsUpdate/NewsUpdateForm"
import SubscribePage from "../Pages/Subscribe/Subscribe"
import { createBrowserRouter, Outlet, } from "react-router-dom";
import { Logo } from '../Components/Logo/Logo';
import NotFound from '../Pages/NotFound/NotFound';
import NewsCategory from '../Pages/NewsCategory/NewsCategory';

const Layout =()=>{
  return(
  <>
  <Header />
  <Outlet />
  <Footer />
  </>
  )
}


const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout />,
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path: "/",
        element: <Logo/>
      },
      {
          path:"/newsletter",
          element:<Newsletter />
      },
      {
          path:"/newsletterDetails/:id",
          element:<NewsLetterDetails />
      },
      {
        path:"/newsCategory/:categoryName",
        element:<NewsCategory />
      },
      {
        path:"/contact",
        element:<Contact />
     },
    {
      path:"/blogsForm",
      element:<BlogForm />
  },
  {
    path:"/updateBlog",
    element:<BlogUpdate />
},
{
  path:"/subscribe",
  element:<SubscribePage />
},
{
  path:"/blog",
  element:<Blogs />
},
{
  path:"/blogDetails",
  element:<BlogDetails />
},
{
  path:"/newsletterUpdate/:id",
  element:<NewsUpdate />
},
{
  path:"/newsForm",
  element:<NewsForm />
},  
    ]
  },
  {
      path: "/dashboard",
      element: <Dashboard />,
    },{
      path: "/*",
      element : <NotFound/>
    }
]);
export default router