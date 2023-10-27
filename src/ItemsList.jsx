import { useState } from 'react';

export default function ItemsList({items = [], onDeleteItem, onMarkAsDone, onMarkAsNew, onReordered}) {

    const [draggedItem, setDraggedItem] = useState(null)
    const [draggedIndex, setDraggedIndex] = useState(null)

    const onDragStart = (item) => {
        setDraggedItem(item)
        setDraggedIndex(items.indexOf(items.find(i => i.id === item.id)))
        setTimeout(() =>{
            document.querySelectorAll('.drag-target').forEach(e => e.classList.add('h-2', 'bg-gray-700'))
        }, 100)
    }
    
    const onDragEnd = (event, item) => {
        setDraggedItem(null)
        setDraggedIndex(null)
        document.querySelectorAll('.drag-target').forEach(e => e.classList.remove('h-2'))
        event.target.classList.add('pointer-events-none', 'bg-sky-900')
        setTimeout(() => {
            event.target.classList.remove('pointer-events-none', 'bg-sky-900')
        }, 500);
    }
    
    const onDragEnter = (event, targetItem) => {
        event.target.classList.add('bg-gray-600', 'h-8')
    }
    
    const onDragLeave = (event) => {
        event.target.classList.remove('bg-gray-600', 'h-8')
    }
    
    const onDropIn = (targetItem, position) => {
        
        // Remover clases
        document.querySelectorAll('.drag-target').forEach(e => e.classList.remove('h-2', 'bg-gray-700', 'h-8', 'h-2'))

        // procesar indexes
        let draggedNewIndex;
        const targetIndex = items.indexOf(items.find((item, index) => item.id === targetItem.id))
        if (position === 'avobe') {
            draggedNewIndex = targetIndex === 0 ? 0 : targetIndex + 1
        } else {
            draggedNewIndex = targetIndex + (targetIndex < draggedIndex ? 1 : 0)
        }
        
        // Si son la misma, no hacer nada
        if (draggedIndex === draggedNewIndex || draggedItem.id === targetItem.id) {
            return
        }
        
        // Mover de orden
        items.splice(draggedIndex, 1)
        items.splice(draggedNewIndex, 0, draggedItem)
        
        setDraggedItem(null)
        setDraggedIndex(null)

        onReordered(items)
    }

    const onDragOver = (event) => {
        event.preventDefault()
    }
    
    const listItems = items.map((item, index) => {
        return (
            <div key={item.id}>
                {
                    index === 0 && draggedItem && draggedItem.id !== item.id
                        ? <div onDragEnter={onDragEnter} onDragLeave={onDragLeave} className="drag-target h-0 transition-all" onDrop={($event) => onDropIn(item, 'avobe')} onDragOver={onDragOver}></div>
                        : ''
                }
                <li className="flex justify-between p-2 transition-colors" draggable onDragStart={() => onDragStart(item)} onDragEnd={($event) => onDragEnd($event, item)}>
                    <div className="flex items-center gap-2 min-w-0">
                        <i className="bi bi-grip-horizontal cursor-move text-gray-500"></i>
                        {
                            item.done
                                ? <button title="Marcar como pendiente" onClick={() => onMarkAsNew(item.id)}><i className="bi bi-check-square-fill"></i></button>
                                : <button title="Marcar como hecho" onClick={() => onMarkAsDone(item.id)}><i className="bi bi-app"></i></button>
                        }
                        <p className="flex-grow truncate">{item.text}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-red-300 hover:text-red-500 " title="Eliminar" onClick={() => onDeleteItem(item.id)}>
                            <i className="bi bi-trash2-fill"></i>
                        </button>
                    </div>
                </li>
                {
                    draggedItem && draggedItem.id !== item.id && draggedItem.id && draggedIndex !== index + 1
                        ? <div onDragEnter={($event) => onDragEnter($event, item)} onDragLeave={onDragLeave} className="drag-target h-0 transition-all" onDrop={($event) => onDropIn(item, 'below')} onDragOver={onDragOver}></div>
                        : ''
                }
            </div>
        )
    });

    return (
        <ul className="text-white">
            { listItems }
        </ul>
    );
    
}