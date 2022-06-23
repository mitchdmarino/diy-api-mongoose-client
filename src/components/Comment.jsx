import {useState} from 'react'
import CommentForm from './CommentForm'

export default function Comment ({comment, handleSubmit, handleDelete}) {
    const [showEditForm, setShowEditForm] = useState(false)
    return (
        <div>
            {
                showEditForm ? 
                <CommentForm key={`${comment.id}`}initialForm={comment} handleSubmit={handleSubmit} />:
                <div className="comment-container">
                    <li>{comment.content}</li>                    
                </div>   
            }
            <button 
                className='bg-gray-400 m-2 border-solid border-2 border-black px-2 block '
                onClick={() => setShowEditForm(!showEditForm)}>
                {
                    showEditForm ? 
                    'Back': 
                    'Edit'
                }
            </button>
            {
                showEditForm ? 
                <button
                    className='bg-gray-400 m-2 border-solid border-2 border-black block '
                    onClick={() => handleDelete(comment)}
                >Delete</button> : 
                ''
            }
            <hr></hr>
        </div>
    )
}