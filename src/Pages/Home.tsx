import BlogList from '../Blog/BlogList';
import useFetch from "../Functionality/useFetch";
import Blog from "../Functionality/Blog";
import './Home.scss';

const Home = () => {
    const { data : blogs, isLoading, error} = useFetch<Blog[]>('http://localhost:8000/blogs');

    return (
        <div className="home">
            {error && <div>{error}</div>}
            { isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
    );
};

export default Home;
