import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import BlogForm from '../BlogForm'

export default function Home() {
    
    const [ blogs, setBlogs ] = useState([])
    const [err, setErr] = useState('')

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BLOG_URL}/blog`)
                console.log(response.data)
                setBlogs(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchBlogs()
    }, [])
    
    const handleCreateBlog = async (e, form, setForm) => {
        e.preventDefault() 
        try {
            const response = await axios.post(`${process.env.REACT_APP_BLOG_URL}/blog`, form)
            console.log(response)
            setBlogs([...blogs,response.data])
            setForm({title:'',body:'',image:''})
        } catch (err) {
            console.log(err)
            if (err.response) {
                if (err.response.status === 400) {
                    setErr(err.response.data.msg)
                }
            }
        }
    }

    const blogList = blogs.map(blog => {
        return (
            <div className='blog-list-component text-center mx-auto my-[20px]' key={blog._id}>
                <p className='block p-6 mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-md'><Link className='mb-2 text-2xl font-bold tracking-tight text-gray-900'to={`/blog/${blog._id}`}>{blog.title}</Link></p>
            </div>
        )
    })

    return (
        <div className='home-container'>
            <div className='blogs-container mt-5 mb-[50px]  '>
                <h1 className='text-4xl text-center'>All Blogs</h1>
                {blogList}
            </div>
            
            <div className='w-4/5 my-0 mx-auto border-black border-solid rounded-lg bg-blue-100 border-4 p-2'>
                <h1 className='text-center mt-[25px]'>Create New Blog</h1>
                <p>{err}</p>
                <BlogForm handleFormSubmit={handleCreateBlog} initialForm={{title:'',body:'',image:''}}/>
            </div>
            
            
        </div>
    )
}