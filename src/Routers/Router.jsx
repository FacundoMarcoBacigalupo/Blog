import { BrowserRouter, Routes, Route } from "react-router-dom" 
import Navbar from '../Components/Navbar/Navbar.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import Blog from '../Components/Blog/Blog.jsx';
import CreatePost from "../Components/Blog/CreatePost/CreatePost.jsx"
import ViewPost from "../Components/Blog/ViewPosts/ViewPosts.jsx"
import ButtonUp from "../Components/ButtonUp/ButtonUp.jsx"
import LoginForm from "../Components/Login/LoginForm.jsx";
import ProtectedRouter from "../Assets/utils/ProtectedRouter.jsx"
import ViewProfile from "../Components/ViewProfile/ViewProfile.jsx"

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
                <Routes>                    
                    <Route exact path="/" element={<Blog/>} />
                    <Route exact path="/post/:postId" element={<ViewPost/>} />
                    
                    <Route element={<ProtectedRouter/>}>
                        <Route exact path="/publicar-post" element={<CreatePost/>} />
                    </Route>
                    
                    <Route exact path="/login" element={<LoginForm/>} />
                    
                    <Route exact path="/profile/:userId" element={<ViewProfile/>} />
                    
                    <Route path='*' element={<h1>Error 404</h1>} />
                </Routes>
                <ButtonUp />
            <Footer />
        </BrowserRouter>
    )
}

export default Router