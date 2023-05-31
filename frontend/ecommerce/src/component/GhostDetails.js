import 'material-symbols';


import 'material-symbols'
import { useState,useContext } from 'react';
import JobContext from '../context/context';

const GhostDetails = ({ job }) => {
    

    const [resume,setResume]=useState('')
    const [covermessage,setCovermessage]=useState('')
    const {setarr} = useContext(JobContext)
    
     
    const submitApplications = async(e) => {
       e.preventDefault()
      const token = JSON.parse(localStorage.getItem('token'))
        const JobApplication = {
            resume: resume,
            coverMessage:covermessage
        }
        const postApply = await fetch('/applications/jobApplications/' + job._id, {
            method: 'POST',
            body: JSON.stringify(JobApplication),
            headers: {
                'token':token,
                'Content-Type': 'application/json'
            }
        })

        if(postApply.ok){
             alert('Application Submitted')
             setResume('')
             setCovermessage('')
        }else{
            alert('Unauthorized')
        }
      
    }







    const updateInfo = async() => {
    
      const token = JSON.parse(localStorage.getItem('token'))
       const title=  window.prompt('Enter title')
        const description=  window.prompt('Enter Description')
        const Job = {
            title: title,
            description:description
        }
        const update = await fetch('/jobs/updateJob/' + job._id, {
            method: 'PUT',
            body: JSON.stringify(Job),
            headers: {
                'token':token,
                'Content-Type': 'application/json'
            }
        })
        if(update.ok){
            alert('Update Successful')
        }else{
            alert('You are not authorized')
        }
        setarr([1])
    }

    return (
        <div className="buyer-details">
            <p><strong>title: </strong>{job.title}</p>
            <p><strong>description: </strong>{job.description}</p>
            <p><strong>tags: </strong>{job.tags}</p>
            <p><strong>location: </strong>{job.location}</p>
            <p><strong>salary: </strong>{job.salary}</p>
            <button className='a' onClick={updateInfo}>update</button>
            <form  onSubmit={submitApplications}> 
             <label className="label1">Apply for Job:</label>
               <label className="label1">Resume Link</label>
            <input 
                type="text" 
                onChange={(e) => setResume(e.target.value)}
                value={resume} 
                required
            />
               <label className="label1">coverMessage:</label>
            <input 
                type="text" 
                onChange={(e) => setCovermessage(e.target.value)}
                value={covermessage} 
                required
            />
            <button type="submit" className='a' >Apply</button>
        </form>

        </div>
    )
}

export default GhostDetails