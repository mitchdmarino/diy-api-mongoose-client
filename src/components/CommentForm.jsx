import {useState} from 'react'

export default function CommentForm({initialForm, handleSubmit}) {
    
    const [commentForm, setCommentForm] = useState(initialForm)


    return (
        <form onSubmit={(e) => handleSubmit(e,commentForm, setCommentForm)}>
            <label htmlFor="content">Content</label>
            <input 
                type='text'
                value={commentForm.content}
                id='content'
                name='content'
                onChange={e => setCommentForm({...commentForm, content: e.target.value})}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}