import styles from '../styles/page.module.css'

import WorkoutCard from '../components/workoutCard.js'
import BMICard from '@/components/bmiCard'
import CreditsCard from '@/components/creditsCard'
import MacrosCard from '@/components/macrosCard'

export default function Home(props) {
  
  const url = "http://192.168.1.120:8080/my-app";
  console.log(props.message)

  return (

    <main style={{backgroundColor: "#232320", height: "100%", width: "100%", padding: "1em"}}>
    

      <div className={styles.main}>
        <WorkoutCard />
        
        <BMICard />
        
        <MacrosCard/>

        <CreditsCard url={url} />
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
  console.log("GET SERVER SIDE PROPS" )
  return { props: { message: "Hello" } }
}