import React,{useState, useEffect} from "react";
import axios from "axios"
import "./header.css"

function Header() {
  const [options,setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState("")

  useEffect(() => {
    axios
      .get("/crypto")
      .then((res) => setOptions(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(options);
  return (
    <div className="header">
      <img src="https://hodlinfo.com/static/media/HODLINFO_white.8f78fc06.png" alt="" />
      
      <div className="header-middle">
        
        <select >
          <option value=''>inr</option>
        </select>

        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map((val)=>{
            return (
              <option value={val.base_unit} key = {val._id}>{val.base_unit}</option>
            )
          })}
        </select>

        <button>BUY BTC</button>
      </div>    
      <button className="contact">connect telegram</button>
    </div>
  );
}

export default Header;
