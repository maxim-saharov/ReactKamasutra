//
export const updateObjectInArray = (array: any, someValue: any,
                                    objPropName: any, newObjPropValue: any) => {

   return array.map((unit: any) => {
         if (unit[objPropName] === someValue) {
            return {...unit, ...newObjPropValue}
         }
         return unit
      }
   )
}

