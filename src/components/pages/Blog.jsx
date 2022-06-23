import {useParams, useNavigate} from 'react-router-dom'
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
    const [showEditForm, setShowEditForm] = useState(false)
    // Comment 
   
    
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
                setShowEditForm(false)
            })
    }
    
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
        <div>
            {
                showForm ?
                <BlogForm handleFormSubmit={handleEditBlog} initialForm={blog}/> : 
                <BlogDetails blog={blog} 
                    handleEditComment={handleEditComment} 
                    handleDeleteComment={handleDeleteComment} 
                    showEditForm={showEditForm}
                    setShowEditForm={setShowEditForm}
                />
            }
            
            <button onClick={() => setShowForm(!showForm)}>
                {
                    showForm ? 
                    'Back': 
                    'Show me the formular'
                }
            </button>
            {
                showForm ? 
                <button
                    onClick={handleDelete}
                >Delete</button> : 
                ''
            }
            <div className='comments'>
                <CommentForm 
                    handleSubmit={handleAddComment} 
                    initialForm={{content: ''}}/> 

            </div>
        </div>
    )
}