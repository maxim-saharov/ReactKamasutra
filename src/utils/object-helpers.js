//
export const updateObjectInArray = (array, someValue,
                                    objPropName, newObjPropValue) => {

   return array.map( unit => {
         if (unit[objPropName] === someValue) {
            return {...unit, ...newObjPropValue}
         }
         return unit;
      }
   )
}

