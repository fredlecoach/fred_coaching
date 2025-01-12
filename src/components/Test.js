import { useState } from "react"

export default function Formulaire(){

  const[firstname, setFirstname]= useState("John Doe")
  const handleChange = (e)=>{
    setFirstname(e.target.value)
  }

  const reset = ()=>{
    setFirstname("")
  }

  const[checked, setChecked] = useState(false)
  const toggleChecked =()=>{
    setChecked(!checked)
  }

  return (
    <form>
      <label for="firstname">Formulaire</label>
      <input type="text" name="firstname" value={firstname} onChange={handleChange}/>
      <input type="checkbox" checked={checked} onChange={toggleChecked} />
      <button type="button" onClick={reset} disabled={!checked} >reset</button>
    </form>
  )
}