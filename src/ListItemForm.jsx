import { useState } from 'react';

export default function ListItemForm ({listItem, onStore}) {
    const [text, setText] = useState('')
    const onSubmit = (event) => {
        event.preventDefault()
        onStore(text)
    }
    return (
        <form className="p-2" onSubmit={onSubmit}>
            <div className="flex items-center justify-between">
                <input
                    type="text"
                    value={text}
                    onInput={(e) => setText(e.target.value)}
                    autoFocus="autofocus"
                    placeholder="Nueva tarea"
                    className="bg-gray-600 text-white p-2 rounded"
                />
                <button type="submit" className="bg-blue-900 text-white h-8 w-8 rounded hover:bg-blue-500">
                    <i className="bi bi-arrow-up"></i>
                </button>
            </div>
        </form>
    )
}