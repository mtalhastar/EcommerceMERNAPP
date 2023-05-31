import 'material-symbols';
import 'material-symbols'
import '../index.css'



import { useState,useEffect } from 'react'
const GameDetails = ({ game }) => {
   
    const[image,setImage]=useState("")
    const[name,setName]=useState("")
    const[gamelist,setgamelist]=useState("")
    const[game1,setgame1]=useState("")
    const [selectedOption, setSelectedOption] = useState('');

    useEffect(()=> {
        
    

   const fetchGames=async()=>{
          
   
          const games=await fetch('/game')
          const gamejson   = await games.json()
        
           setgamelist([...gamejson])
         
         }
         fetchGames()
    })




    const handleClick = async () => {
        const response = await fetch('/game/' + game._id, {
            method: 'DELETE'
        })
        
    }

    const updateInfo = async(e) => {
         
      e.preventDefault()
         
       const Game={Name:name}
         
       
        const update = await fetch('/game/' + game._id, {
            method: 'PUT',
            body: JSON.stringify(Game),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }


    return (
        <div className="buyer-details">
            <p><strong>Name: </strong>{game.Name}</p>
            {/* <h3>GameList:</h3>
            
             {evidence.GameList && evidence.GameList.map((games)=>{
                  return <p>{games}</p>
              })
             } */}
             
            {/* <p><strong>Image: </strong></p><img className='img1' src={evidence.Image}/> */}
           
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
            
       {/* <form  onSubmit={updateInfo}> 
 
        <label className="label1">Assign The Game</label>
        <select className="dropdown1"
           value={selectedOption}
            onChange={handleOptionChange}
            onClick={handleAddGame}>
            <option value="">Select Option</option>
        {gamelist && gamelist.map((option) => (
        <option   key={option._id}     value={option.Name}>
        {option.Name}
             </option>
         ))}
        </select>
        <button className='a' >Update</button>
        </form> */}
        </div>
    )
}

export default GameDetails