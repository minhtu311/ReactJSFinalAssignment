import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link } from "react-router-dom";



const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchText, setSearchText] = useState("");
    const [sortName, setSortName] = useState("(NONE)");

    useEffect(() => {
        let didCancel = false;
        setLoading("true");
        axios({
            method: "GET",
            url: `https://jsonplaceholder.typicode.com/posts`,
        })
            .then(({ data }) => {
                if (!didCancel) {
                    setPosts(data);
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
    }, [])
    if (loading) return <h1>Loading...</h1>
    if (error) return <h2>Error:</h2>
    console.log(posts)
    const postFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));
    const getPostSorted = () => {
        if (sortName === "(NONE)") return postFiltered;
        if (sortName === "ASC") return postFiltered.sort((PostA, PostB) => {
            if (PostA.title.toLowerCase() < PostB.title.toLowerCase()) return -1;
            if (PostA.title.toLowerCase() > PostB.title.toLowerCase()) return 1;
            return 0;
        })
        return postFiltered.sort((PostA, PostB) => {
            if (PostA.title.toLowerCase() > PostB.title.toLowerCase()) return -1;
            if (PostA.title.toLowerCase() < PostB.title.toLowerCase()) return 1;
            return 0;
        })
    }
    const handleSortNameClicked = () => {
        setSortName(current => {
            if (current === "(NONE)") return "ASC";
            if (current === "ASC") return "DES";
            return "(NONE)";
        })
    }

    const postSorted = getPostSorted();

    const handleDelete = (id) => {
        setPosts(posts.filter((p) => p.id !== id));
      };

    return (
        <div>
            <div>
                <input className='form-control'
                    type='text'
                    placeholder='Search by title'
                    value={searchText}
                    onChange={evt => setSearchText(evt.target.value)} />
            </div>
            <table className='table table-bordered mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th onClick={handleSortNameClicked}>Title -- Sort {sortName}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {postSorted.map(({ id, title }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>
                                <Link className='me-3' to={`/posts/${id}`}>View detail </Link>
                                <button className='btn btn-primary' onClick={() => {handleDelete(id);}}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PostsPage