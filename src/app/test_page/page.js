"use client"

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
 
// Current URL is '/'
function Page() {
//   const router = useRouter()
//   const path = usePathname()
//   const [counter, setCounter] = useState(0)
  
//   useEffect(() => {
//     // Always do navigations after the first render
//     router.push(`${path}/?counter=${counter}`, undefined, { shallow: true })
//   }, [])

// //   useEffect(() => {
// //     // The counter changed!
// //   }, [router.query.counter])

//   const pushCounter = () => {
//     setCounter(counter + 1);
//     router.push(`${path}/?counter=${counter}`, undefined, { shallow: true });
//   }
  
//   const backFunc = () => {
//     // router.back(`${path}/?counter=${counter}`, undefined, { shallow: true });
//     router.back();
//   }
  
//   const forwardFunc = () => {
//     // router.back(`${path}/?counter=${counter}`, undefined, { shallow: true });
//     router.forward();
//   }

    const path = "/name=&muscle=Triceps&category=Dumbbells&difficulty=Beginner&force=&page=1";
    const keyValuePairs = path.slice(1).split('&');
    const [key, page] = keyValuePairs.pop().split('='); 
    console.log(page)

    // console.log(router)
    return (
    <div style={{display: "flex", flexDirection: "column", width: "max-content", gap: "2em", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
        {/* <button onClick={pushCounter}>PUSH COUNTER</button>
        <button onClick={backFunc}>BACK</button>
        <button onClick={forwardFunc}>FORWARD</button>
        <button onClick={pushCounter}>PUSH COUNTER</button>
        <button onClick={pushCounter}>PUSH COUNTER</button> */}
    </div>
    )
}
 
export default Page