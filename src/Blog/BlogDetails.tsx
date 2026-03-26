import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../Functionality/useFetch";
import Blog from "../Functionality/Blog";
import './BlogDetails.scss';

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { data: blog, error, isLoading } = useFetch<Blog>('http://localhost:8000/blogs/' + id);

    const navigate = useNavigate();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        });
    }

    return (
        <div className="blog-details">
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <div>{blog.date}</div>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;