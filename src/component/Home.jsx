import React from "react";

import { Notes } from "./Notes";

function Home(props) {
      // const a = useContext(noteContext)
  // useEffect(() => {
  //     a.update();
  //      // eslint-disable-next-line
  // }, [])
 
    return (
       <div>
         <Notes showAlert={props.showAlert}/>
       </div>
    )
}

export default Home
