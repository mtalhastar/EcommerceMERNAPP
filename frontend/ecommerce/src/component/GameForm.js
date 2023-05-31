import { useState } from "react"

const GameForm = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const buyer = {Name:name}

        const response = await fetch('/game', {
            method: 'POST',
            body: JSON.stringify(buyer),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setName('')
            setImage('')
            setError(null)
            setEmptyFields([])
           
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="h31">Add New Game</h3>

            <label className="label1">Name:</label>
         
            <input 
                type="text" 
                onChange={(e) => setName(e.target.value)}
                value={name} 
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <button className="button1">Add Game</button>
            {error && <div className="error">{error}</div>}
        </form>

        
    )
}

export default GameForm