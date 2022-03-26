//

import React from "react";
import store from "./redux/redux-store";

const StoreContext = React.createContext( {} );

export const Provider = (props) => {

   return (

      <StoreContext.Provider value={props.store}>

         {props.children}

      </StoreContext.Provider>

   )
}

export default StoreContext;

// тут когда вызывающий это вызовет - он передаст сюда параметры через пропсы
// и свого ребенка тоже с пропсами и как бы потом вызывающий
// сам уничтожится и вместо него
// вернется все то что было в сф
// это вроде композиция

// или можно без этого сделать а простым способом без передачи сф