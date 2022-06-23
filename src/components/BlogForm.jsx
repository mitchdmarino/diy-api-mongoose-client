import { useState } from 'react'

export default function BlogForm({ handleFormSubmit, initialForm }) {
    const [form, setForm] = useState(initialForm)


    return (

        <form
            onSubmit={e => handleFormSubmit(e, form, setForm)}
        >
            <div className='mb-6'>
                <label className='block mb-2 text-sm font-medium text-gray-900'
                    htmlFor="title">Title</label>

                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type='text'
                    name='title'
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />
            </div>
            <div className='mb-6'>

                <label className='block mb-2 text-sm font-medium text-gray-900'
                    htmlFor="body">Body</label>

                <textarea
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type='text'
                    name='body'
                    value={form.body}
                    onChange={e => setForm({ ...form, body: e.target.value })}
                />
            </div>
            <div className='mb-6'>

                <label className='block mb-2 text-sm font-medium text-gray-900'
                    htmlFor="image">Image Url</label>

                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                    type='text'
                    name='image'
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                />
            </div>

            <button className='block mx-auto bg-green-400 p-3 border-solid border-2 border-black rounded-lg 'type='submit'>Submit</button>
        </form>
    )
}