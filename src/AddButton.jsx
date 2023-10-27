export default function AddButton({onClick}) {
    return (
        <button className="transition-colors text-white bg-blue-900 hover:bg-blue-500 p-2 rounded" onClick={onClick}>
            <i className="bi bi-plus-square-fill"></i>
        </button>
    )
}