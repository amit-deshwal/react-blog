import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('pixr');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blogData = { title, body, author};
        setIsPending(true)
        fetch('http://localhost:8000/blogs',{
            method : 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify(blogData)
        }).then((response)=>{
            if(response.ok){
                setIsPending(false)
                history.push('/')
            }
        })
    }
     
  return (
    <div className="create">
      <h2>Add a new blog.</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
         type="text" 
         value={title}
         onChange={(e)=> setTitle(e.target.value)} 
         required 
         />
        <label>Blog Body:</label>
        <textarea
         value={body}
         onChange={(e)=> setBody(e.target.value)}
        required
        ></textarea>
        <label>Blog Author:</label>
        <select
         value={author}
         onChange={(e)=> setAuthor(e.target.value)}
        >
            <option value="pixr">pixr</option>
            <option value="sinter">sinter</option>
        </select>
        <button className={ isPending ? 'button disable-button' : 'button' } type="submit">{ isPending ? 'Adding Blog.....' : 'Add Blog' }</button>
      </form>
    </div>
  );
};

export default Create;