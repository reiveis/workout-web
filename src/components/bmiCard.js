"use client"

import styles from '../styles/page.module.css'
import { useState, useEffect } from "react";



export default function BMICard() {
    
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [weightStatus, setWeightStatus] = useState("");
    
    const calcBMI = () => {
        setBMI(((weight)/(height/100)**2).toFixed(1));
        console.log(bmi);
    }
  
    useEffect(() => {
      if (bmi < 18.5) {
        setWeightStatus("Underweight");
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        setWeightStatus("Healthy Weight");
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        setWeightStatus("Overweight");
      } else {
        setWeightStatus("Obesity");
      }
    }, [bmi]);

    return (
        <div className={`${styles.bmiCard} ${styles.card}`}>
        <h3>BMI Calculator</h3>
        <form>
            <label>Weight: <input type="number" placeholder="kg" max={500} min={20} onChange={(e) => setWeight(e.target.value)}></input></label>
            <label>Height: <input type="number" placeholder="cm" max={300} min={20}  onChange={(e) => setHeight(e.target.value)}></input></label>
            <button className={styles.button} onClick={(e) => {
              calcBMI();
              e.preventDefault();
              }} >Calculate</button>
        </form>
        <hr style={{border: "3px solid black", borderRadius: "10px", margin: "1rem 0"}}></hr>
        <div className={styles.result}>
          <h2>Your BMI is {bmi}</h2>
          <div className={styles.bmiBar}>
            <div 
              className={styles.bmiPointer} 
              style={{
                left: `${ (bmi > 17 && bmi < 30) ? (((bmi-17)/18))*95 : (bmi > 30) ? 95 : (bmi < 17) ? 0 : 0 }%`}}></div>
          </div>
          <h2>{weightStatus}</h2>
        </div>
      </div>
    )
}