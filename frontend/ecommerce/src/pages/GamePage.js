import { useEffect, useState } from 'react'

import GameDetails from '../component/GameDetails'
import GameForm from '../component/GameForm'

const GamePage = () => {
    
    const [evidence,setEvidence]=useState()

    useEffect(() => {
        
        const fetchBuyer = async () => {
            const response = await fetch('/game')
            const json = await response.json()

            if (response.ok) {
                setEvidence([...json])
            }
        }

        fetchBuyer()
    })

    return (
        <div className="home">
            <div className='buyer'>
                {evidence && evidence.map((buyer) => (
                    <GameDetails key={evidence._id} game={buyer} />
                ))}
            </div>
            <GameForm />
        </div>
    )
}

export default GamePage