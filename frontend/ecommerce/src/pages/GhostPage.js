import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import GhostDetails from '../component/GhostDetails'
import GhostForm from '../component/GhostForm'
import JobContext from '../context/context'

const GhostPage = () => {
    
    const [jobs,setjobs]=useState()
    const [arr,setarr]=useState([])
    const [input,setsearch]=useState('')
    useEffect(() => {
            const fetchJobs = async () => {
            const token=JSON.parse(localStorage.getItem('token'))
            console.log(token)
            const response = await fetch('/jobs/getAllJobs',{
                headers:{'token':token},
                method:'GET'
            }
            )
            const json = await response.json()
            if (response.ok) {
                setjobs([...json])
            }else{
                alert('Unsuccessful')
            }
        }
        fetchJobs()
    },[arr])
  const fetchJobs = async () => {
            const token=JSON.parse(localStorage.getItem('token'))
            console.log(token)
            const response = await fetch('/jobs/searchJob?keyword='+input,{
                headers:{'token':token},
                method:'GET'
            }
            )
            const json = await response.json()
            if (response.ok) {
                setjobs([...json])
            }else{
                alert('Unsuccessful')
            }
  }
    const searchJob=()=>{
     
        fetchJobs()
    }
    return (
        <JobContext.Provider value={{arr,setarr}}>
        <div className="home">
            <input type='search' placeholder='Search for job by title'
            onChange={(e)=>setsearch(e.target.value)}
            value={input}></input>
            <button type="button" className='a' onClick={searchJob}> Search</button>
           
            <div className='buyer'>
                {jobs && jobs.map((job) => (
                    <GhostDetails key={job._id} job={job} />
                ))}
            </div>
            <GhostForm />
        </div>
        </JobContext.Provider>
    )
}

export default GhostPage