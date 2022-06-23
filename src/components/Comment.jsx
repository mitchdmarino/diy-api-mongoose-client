import {useState} from 'react'
import CommentForm from './CommentForm'

export default function Comment ({comment, handleSubmit, handleDelete, blogId}) {
    const [showEditForm, setShowEditForm] = useState(false)
    return (
        <div>
            {
                showEditForm ? 
                <CommentForm key={`${comment.id}`}initialForm={comment} handleSubmit={handleSubmit}/>:
                <div className="comment-container">
                    <li>{comment.content}</li>                    
                </div>   
            }
            <button onClick={() => setShowEditForm(!showEditForm)}>
                {
                    showEditForm ? 
                    'Back': 
                    'Show me the formular'
                }
            </button>
            {
                showEditForm ? 
                <button
                    onClick={() => handleDelete(comment)}
                >Delete</button> : 
                ''
            }
            <hr></hr>
        </div>
    )
}