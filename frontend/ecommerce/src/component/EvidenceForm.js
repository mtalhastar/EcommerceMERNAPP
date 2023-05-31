import { useState } from "react"

function replaceDriveLink(link) {
  if (link.includes("drive.google.com") && link.includes("/file/d/")) {
    const fileId = link.split("/file/d/")[1].split("/")[0];
    const shareableLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    return shareableLink;
  } else {
    return link;
  }
}
const EvidenceForm = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
       

        const buyer = {Name:name, Image:image}

        const response = await fetch('/evidence', {
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
         

        </form>

        
    )
}

export default EvidenceForm