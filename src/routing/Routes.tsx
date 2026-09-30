
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../components/global/AppLayout";
import { lazy, Suspense } from "react";
import MainLoading from "../components/global/MainLoading";

const Login=lazy(()=>import('../pages/login'));
const Home=lazy(()=>import('../pages/home'));
const AboutUs=lazy(()=>import('../pages/about-us'));
const Todos=lazy(()=>import('../pages/todo-list'));
const Posts=lazy(()=>import('../pages/posts'));
const PostDetails=lazy(()=>import('../pages/posts/component/details'));
const CreatePost=lazy(()=>import('../pages/posts/component/CreatePost'));
const Counter=lazy (()=>import('../pages/counter'));
const Products=lazy(()=>import('../pages/products'));
const Cart=lazy(()=>import('../pages/cart'));
const Profile=lazy(()=>import('../pages/profile'))
const NotFound=lazy(()=>import('../pages/not-found'))

const AppRoutes = () => {
    return (
        <Suspense fallback={<MainLoading/>}>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/app/home" />} />
            <Route path="/app" element={<Navigate to="/app/home" />} />

            <Route path="/app" element={<AppLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="todo-list" element={<Todos />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="posts" element={<Posts />} />
                <Route path="posts/CreatPost" element={<CreatePost />} />
                <Route path="posts/:postId" element={<PostDetails />} />
                <Route path="counter" element={<Counter />} />
                <Route path="products" element={<Products />} />
               
                <Route path="cart" element={<Cart />} />

            </Route>

            <Route path="*" element={<NotFound />} />

        </Routes>
        </Suspense>
    )
}
export default AppRoutes;