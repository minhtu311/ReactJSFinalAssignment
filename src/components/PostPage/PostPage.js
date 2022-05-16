import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const [post, setPost] = useState({
        id: null,
        title: null,
        body: null
    })
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        let didCancel = false;
        setLoading("true");
        axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        })
            .then(({ data }) => {
                if (!didCancel) {
                    setPost({
                        id: data.id,
                        title: data.title,
                        body: data.body
                    });
                    setLoading(false);
                }
            })
            .catch(err => {
                if (!didCancel) {
                    setLoading(false);
                    setError("Something went wrong")
                }
            })
        return () => {
            didCancel = true;
        }
    }, [id])
    if (loading) return <h1>Loading...</h1>
    if (error) return <h2>Error:</h2>

    return (
        <div>
            <p>ID: {id}</p>
            {
                loading ? "Loading...":(
                    <div>
                        <p>Title: {post.title}</p>
                        <p>Body: {post.body}</p>
                    </div>
                )
            }
        </div>
    )
}

export default PostPage