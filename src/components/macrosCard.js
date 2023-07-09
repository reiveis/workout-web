'use client'


import drop from '../styles/dropdown.module.css'
import styles from '../styles/page.module.css'

import Select from 'react-select'
import { useState, useEffect } from 'react';

import { activitylevel, goals, gender } from '@/data';

export default function MacrosCard() {

    const diets = ['balanced', 'highprotein', 'lowcarbs', 'lowfat'];

    const [result, setResult] = useState({
        "calorie": 0,
        "balanced": {
            "protein": 0,
            "fat": 0,
            "carbs": 0
        },
        "lowfat": {
            "protein": 0,
            "fat": 0,
            "carbs": 0
        },
        "lowcarbs": {
            "protein": 0,
            "fat": 0,
            "carbs": 0
        },
        "highprotein": {
            "protein": 0,
            "fat": 0,
            "carbs": 0
        }
    });
    const [form, setForm] = useState(
        {
            age: "",
            gender: "male",
            height: "",
            weight: "",
            activitylevel: "3",
            goal: "maintain"
        }
    )
    const [options, setOptions] = useState({
        method: 'GET',
        url: 'https://fitness-calculator.p.rapidapi.com/macrocalculator',
        params: {
            age: '20',
            gender: 'male',
            height: '165',
            weight: '62',
            activitylevel: '4',
            goal: 'maintain'
          },
        headers: {
            'X-RapidAPI-Key': '2585f353a7msh55d4728ef0bfef2p14ee97jsn91e2aa2a535f',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
            }

    })

    useEffect(() => {
        setOptions((prevOptions) => (({ 
                ...prevOptions,
                params: form,
            })));

    }, [form])
    
    const axios = require('axios');

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            setResult(response.data.data);
            // console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (name, value) => {
        setForm((prevFormData) => ({
          ...prevFormData,
          [name]: String(value),
        }));
      };

    const handleSubmit = () => {
        const {age, weight, height} = form;

        const ranges = {
            age: { min: 1, max: 80 },
            weight: { min: 40, max: 160 },
            height: { min: 130, max: 230 },
          };
      
          // Validate the input values
          if (
            age >= ranges.age.min &&
            age <= ranges.age.max &&
            weight >= ranges.weight.min &&
            weight <= ranges.weight.max &&
            height >= ranges.height.min &&
            height <= ranges.height.max 
          ) {
            // Update the final state variables here if needed
            // setOptions((prevOptions) => (({ 
            //     ...prevOptions,
            //     params: form,
            // })));
            fetchData();
          } else {
            // Handle invalid input or display an error message
            alert('Please enter valid input values within the specified ranges\n\t1 > Age <= 80\n\t40 >= Weight <= 160\n\t130 >= Height <= 230');
          }
    }

    return (
        <div className={`${styles.macrosCard} ${styles.card}`}>
            <h3>Macros Calculator</h3>
            <div className={styles.macros_io}>
                <div style={{width: "100%"}}>
                    <form  className={styles.macros_input}>
                        <label className={styles.select} style={{gridColumn: "1 / -1"}}>
                            Activity Level: 
                            <Select 
                                className={drop.macros}
                                defaultValue={activitylevel[0]}
                                options={activitylevel}
                                onChange={(e) => {handleInputChange('activitylevel', e.value)}}
                                />
                        </label>
                        <label style={{gridColumn: "1 / -1"}}>
                            Goals: 
                            <Select 
                                className={drop.macros}
                                defaultValue={goals[0]}
                                options={goals}
                                name='goal'
                                onChange={(e) => handleInputChange('goal', e.value)}
                                />
                        </label>
                        <label>
                            Gender: 
                            <Select 
                                className={drop.macros}
                                defaultValue={gender[0]}
                                options={gender}
                                onChange={(e) => handleInputChange('gender', e.value)}

                                />
                        </label>
                        <label>Age: <input type="number" placeholder="years" min={5} max={200} onChange={(e) => handleInputChange('age', e.target.value)}></input></label>
                        <label>Weight: <input type="number" placeholder="kg" min={5} max={200} onChange={(e) => handleInputChange('weight', e.target.value)}></input></label>
                        <label>Height: <input type="number" placeholder="cm" min={5} max={200} onChange={(e) => handleInputChange('height', e.target.value)}></input></label>
                        <button className={styles.button} onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                            // console.log(options);
                            }} >Calculate</button>    
                    </form>
                </div>
                <div className={styles.vertLine}></div>
                <div className={styles.macros_output}>
                    <h2>Your daily intake is {Math.round(result.calorie)} calorie</h2>
                    <div className={styles.diet_list}>

                    {    diets.map((diet) => {
                        return (
                            
                            <div key={diet}>
                                    <h4 style={{textAlign: "center"}}>{ (diet == 'balanced') ? "Balanced" : (diet == 'highprotein') ? "High Protein" :(diet == 'lowcarbs') ? "Low Carbs" : "Low Fat" }</h4>
                                    <ul className={styles.macros_ul}>
                                        <li>Protein: {Math.round(result[diet].protein)}g</li>
                                        <li>Carbs: {Math.round(result[diet].carbs)}g</li>
                                    <li>Fat: {Math.round(result[diet].fat)}g</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>

            </div>
        </div>

    )
}