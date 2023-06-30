import fs from 'fs'
import data from './data.js'

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const ddfEndpoint = 'https://wfam-zebra.wellsfargo.com/2cds-service/fundProfileData'
const str = ''

refetch(data, 0)

function refetch(arr, index) {
  if (index >= arr.length){
    console.log(str)
    return
  }
  // else
  const item = arr[index]

  fetch(`${ddfEndpoint}?taNumber=${item.ta}`)
      .then(resp => {
        // resp.json()
        return resp.text()
      })
      .then(data => {
        const jsonStr = data
        const match = jsonStr.match(/".*?" :/g) // Looks for json field names surrounded by quotes followed by a colon e.g. "TaNumber" :
        const fieldCount = match === null ? 0 : match.length
        console.log(index, item.ta + '\t' + fieldCount, '\t| expects:', item.fieldCount)
        // console.table([item.ta, fieldCount])
        if(fieldCount === 0) fs.writeFileSync('./output.txt', jsonStr)
        
        //
        if (fieldCount !== item.fieldCount) {
          // Ouput fields missing or extra
        }

        setTimeout(()=>{
          refetch(arr, index+1)
        }, 3000)
      })
}

