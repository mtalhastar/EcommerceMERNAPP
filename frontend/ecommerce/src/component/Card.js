import { useEffect,useState,useMemo,useRef } from "react"
import '../index.css'

function Card(props) {

const [selected, setSelected] = useState(false);
const [doubleClicked, setDoubleClicked] = useState(false);
const [disabled,setdisabled]=useState("Disable")
const [clicked,setClicked] =useState("Select")


  // Rest of component code ...

const handleClick = () => {
   if(doubleClicked){
       return
     }
     setSelected(!selected);
   
    
  if (selected) {
    // Card is being unselected
  //  const prevMatchingGhostlist =
   // matchingGhostlist.current = prevMatchingGhostlist || [];
    props.setEvidence([], props.e);
    props.handleUnSelect(props.e)
     setClicked("Select")
    //props.setGhost(matchingGhostlist.current);
   
    } else {
      // Card is being selected
      props.setEvidence(props.e);
      setClicked("UnSelect")
      props.handleCardSelect(props.e)
    //  props.setGhost(matchingGhostlist.current);
    }
  };


const handleDisable = () => {
    setDoubleClicked(!doubleClicked);
    props.handleDisableClick(props.e)
      setdisabled("Enable")
      props.evidenceaddinto(props.e)
    if(doubleClicked){
      setdisabled("Disable")
      props.evidencecancelling(props.e)
      props.handleEnableClick(props.e)
    }
  };
return (
 <div className={`card card1 ${selected ? 'selected' : ''} ${doubleClicked ? 'double-clicked' : ''}`}>
  <div className="container">
    <img src={props.e.Image} alt={props.e.Name} />
    <h3>{props.e.Name}</h3>
  </div>

    <button style={{ backgroundColor: '#000000', color: 'white', display: 'inline-block', padding: '8px 16px', textAlign: 'center', textDecoration: 'none', fontSize: '16px', border: 'none', borderRadius: '4px', boxSizing: 'border-box' }} className="btn-select" onClick={handleClick}>{clicked}</button>
    <button style={{ backgroundColor: '#000000', color: 'white', display: 'inline-block', padding: '8px 16px', textAlign: 'center', textDecoration: 'none', fontSize: '16px', border: 'none', borderRadius: '4px', boxSizing: 'border-box' }} className="btn-select" onClick={handleDisable}>{disabled}</button>
 
</div>
);
}

export default Card;