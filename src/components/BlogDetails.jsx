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
                    showEditForm={props.showEditForm} 
                    setShowEditForm={props.setShowEditForm}/>
            )
    })}
    return (
        
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.body}</p>
            <img src={blog.image}/>
            <h2>Comments</h2>
            <ul>
                {comments}
            </ul>
            
        </div>
    )
}