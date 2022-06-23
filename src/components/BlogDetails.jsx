import Comment from './Comment'

export default function BlogDetails(props) {
    const blog = props.blog
    let comments = ''
    if (blog.comments) {
        comments = blog.comments.map(comment => {
            return (
                <Comment 
                    key={`comment-${comment._id}`}
                    comment={comment} 
                    blogId={blog._id} 
                    handleSubmit={props.handleEditComment} 
                    handleDelete={props.handleDeleteComment} 
                    />
            )
    })}
    let image = ''
    if (blog.image) {
        image=<img className='mx-auto p-5 w-[600px] h-[auto]'src={blog.image} alt='blog image'></img>
    }
    return (
        
        <div className=''>
            <h1 className='text-6xl text-center mb-10'>{blog.title}</h1>
            {image}
            <p className=''>{blog.body}</p>
            <h2 className='text-2xl mt-10'>Comments</h2>
            <ul>
                {comments}
            </ul>
            
        </div>
    )
}