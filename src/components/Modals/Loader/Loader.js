import { React } from "react";
import { ClipLoader } from "react-spinners";
import "./LoaderModal.css"

const Loader = () => {
    return (
        <div className='load-modal'>
          <div className='center loader'>
            <ClipLoader size={80}/>
          </div>
      </div>
    )
}

export default Loader