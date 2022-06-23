import {useParams, useNavigate, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

import BlogDetails from '../BlogDetails'
import BlogForm from '../BlogForm'
import CommentForm from '../CommentForm'


export default function Blog() {
    //states 
    const [blog, setBlog] = useState({})
    // state to either render blog edit form or blog details
    const [showForm, setShowForm] = useState(false)
  
    
    // blog Id
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BLOG_URL}/blog/${id}`)
            .then(response => {
                setBlog(response.data)
            })
            .catch(console.warn)
    }, [id] )

    // Edit this Blog 

    const handleEditBlog = (e, form, setForm) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_BLOG_URL}/blog/${blog._id}`, form)
            .then(response => {
                console.log(response.data)
                setBlog(response.data)
                setShowForm(false)
            })
            .catch(console.warn)
    }
    
    // Delete this blog
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BLOG_URL}/blog/${blog._id}`)
            .then(response => {
                navigate('/')
            })
            .catch(console.warn)
    }

    // Add a comment to this blog 
    const handleAddComment = (e, commentForm, setCommentForm) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BLOG_URL}/blog/${blog._id}/comments`, commentForm)
            .then(response => {
                console.log(response.data)
                setBlog(response.data)
                setCommentForm({content: ''})
            })
    }
    // Edit a comment on this blog
    const handleEditComment = (e, commentForm) => {
        e.preventDefault()
        console.log(commentForm)
        axios.put(`${process.env.REACT_APP_BLOG_URL}/comment/${commentForm._id}`, commentForm)
            .then(response => {
                setBlog(response.data)
            })
    }
    
    // Delete a comment on this blog 
    const handleDeleteComment = async (comment) => {
            try {
                console.log(comment)
                const response = await axios.delete(`${process.env.REACT_APP_BLOG_URL}/comment/${comment._id}`)
                setBlog(response.data)
    
            } catch (err) {
                console.warn(err)
            }
            
        }
    return (
        <div className='p-10'>
            <p className='block text-blue-700'><Link to='/'>Home</Link></p><br></br>
            {
                showForm ?
              
                    <BlogForm handleFormSubmit={handleEditBlog} initialForm={blog}/>:
                    <div>
                        <BlogDetails blog={blog} 
                            handleEditComment={handleEditComment} 
                            handleDeleteComment={handleDeleteComment} 
                        />
                        <div className='comments text-center'>
                            <h4 className='text-2xl my-4'>Add a comment</h4>
                                <CommentForm 
                                    handleSubmit={handleAddComment} 
                                    initialForm={{content: ''}}/> 
                        </div>
                    </div>
            }
            
            <button 
                className='bg-blue-400 p-2 border-solid border-2 border-black mx-auto block my-20'
                onClick={() => setShowForm(!showForm)}
            >
                {
                    showForm ? 
                    'Back': 
                    'Edit this blog'
                }
            </button>
            {
                showForm ? 
                <button
                    className='bg-red-400 p-2 border-solid border-2 border-black mx-auto block my-20'
                    onClick={handleDelete}
                >Delete Blog</button> : 
                ''
            }
            
        </div>
    )
}