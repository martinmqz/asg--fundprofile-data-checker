import { sampleFundProfileData, sampleFundProfileData2 } from './sample-fundprofile-data.js'

const A = {
  FundProfile: {
    FundAccountingId: 'Y619',
    Overview: {
      Ticker: 'ESPRX',
      //ExtraField: 'text',
      CUSIP : '94988A668',
      innerObj: {
        a:1,
        b:2
      },
      innerPropA: 1
    },
    ExtraFromA: {
      subextraFromA: 1
    }
  }
}
const B = {
  FundAccountingId: 'Y619',
  Overview: {
    Ticker: 'ESPRX',
    CUSIP : '94988A668',
    //ExtraFromB: 1,
    innerObj: {
      a:1
    }
  }
}

// compareFundProfileData(A,B)
//console.log(path)
let path = ''
const paths = []
compareAinB(sampleFundProfileData, sampleFundProfileData2, '')
console.log(paths)

export default function compareFundProfileData (objA, objB) {
  // const supersetData = objA.fieldCount > objB.fieldCount ? objA.data : objB.data
  // const subsetData = objA.fieldCount > objB.fieldCount ? objB.data : objA.data
  const supersetData = Object.keys(objA).length > Object.keys(objB).length ? objA : objB
  const subsetData = Object.keys(objA).length > Object.keys(objB).length ? objB : objA
  path += '.'
  
  for (const prop in supersetData) {
    //if(typeof supersetData[prop] !== 'object' && typeof supersetData[prop] !== 'function') {
      // if hasOwn()
      if (!Object.hasOwn(subsetData, prop)) {
        path += prop
        console.error('missing prop ', prop, 'from subset' )
      }
    //}
    //else {
      //if (typeof supersetData[prop] === 'object') {
        path += prop
        compareFundProfileData(supersetData[prop], subsetData[prop])
      // }
      // else {
      //   // its a function, do nothing
      //   console.log('its a function?')
      // }
    //}
  }
}

function compareAinB(objA, objB, curPath) {
  // path += curPath + '.' // . | .Overview. | .Overview.innerObj. | 

  for(const aProp in objA) {
    if(!objB.hasOwnProperty(aProp)) {
      console.error ('B does not have prop:', aProp)
      paths.push (curPath + '.' + aProp) // .Overview.innerObj.b | 
    }
    else {
      if(typeof objA[aProp] === 'object') {
        //path += aProp
        // path += '.' + aProp
        compareAinB(objA[aProp], objB[aProp], curPath + '.' + aProp)
      }
    }
  }
}
