import { useState, useEffect } from "react";
import Bloglist from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error,setErrorMessage] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/blogs")
            .then(res => {
                console.log(res);
                if(!res.ok){
                    throw Error('Unable to load data from the resource')
                }
                return res.json();
            })
            .then(data => {
                setBlogs(data);
                setIsPending(false);
                setErrorMessage(null);
            })
            .catch(err => {
                setIsPending(false);
                setErrorMessage(err.message);
            })
    }, []);

    return (
        <div className="home">
            {error && <div>{error} </div>}
            {isPending && <div>Loading...</div>}
            {blogs && <Bloglist blogs={blogs} />}
        </div>
    );
};

export default Home;
