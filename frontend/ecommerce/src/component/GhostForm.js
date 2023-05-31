import { useState,useEffect,useContext } from "react"
import JobContext from "../context/context"
const GhostForm = () => {
    const [title, setTitle] = useState('')
    const [description, setdescription] = useState('')
    const [tags, settags] = useState('')
    const [location, setlocation] = useState('')
    const [salary, setsalary] = useState('')
     const [error, setError] = useState('')
     const {setarr} =useContext(JobContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const token =JSON.parse(localStorage.getItem('token'))
        const job = {title:title, description:description,tags:tags,location:location,salary:salary}
      
        const response = await fetch('/jobs/addJob', {
            method: 'POST',
            body: JSON.stringify(job),
            headers: {
                'token':token,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            alert('Not Authorized as Employee or Admin')
        }

        if (response.ok) {
            setTitle('')
            setdescription('')
            settags('')
            setlocation('')
            setsalary('')
            setError('')
        }

        setarr([1,3,4,5])
    }


    return (
        <>
        <form className="create" onSubmit={handleSubmit}>
            <h3 className="h31">Add Jobs</h3>

            <label className="label1">title:</label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title} 
                required
            />
               <label className="label1">description:</label>
            <input 
                type="text" 
                onChange={(e) => setdescription(e.target.value)}
                value={description} 
                required
            />
              <label className="label1">tags:</label>
            <input 
                type="text" 
                onChange={(e) => settags(e.target.value)}
                value={tags} 
                required
            />
              <label className="label1">location:</label>
            <input 
                type="text" 
                onChange={(e) => setlocation(e.target.value)}
                value={location} 
                required
            />
              <label className="label1">salary:</label>
            <input 
                type="text" 
                onChange={(e) => setsalary(e.target.value)}
                value={salary} 
                required
            />
            <button type="submit">Submit</button>
            <h1>{error}</h1>

        </form>
         
       
        </>
    )
}

export default GhostForm