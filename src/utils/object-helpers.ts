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


export const outputDateSeconds = () => {
   const date = new Date()
   let output = String(
      date.getHours()
      + ':' + date.getMinutes()
      + ':' + date.getSeconds()
      + ':' + date.getMilliseconds()
   )
   output = output + ''
   return output
}


export const uniqueIdGetTimeInStringPlusIndex = (index: number | string) => {
   const date = new Date()
   let output = String(date.getTime())
   output = output + '_' + index
   return output
}

