'use client'

import styles from '../styles/page.module.css'
import drop from '../styles/dropdown.module.css'
import Select from 'react-select'
import Link from 'next/link'
import {categories, difficulties, forces, muscles} from '../data.js'

import { useState } from 'react'

export default function WorkoutCard() {

    const [searchParams, setSearchParams] = useState({
        name: "",
        muscle: "",
        category: "",
        difficulty: "",
        force: ""
    })


    const handleInputChange = (name, value) => {
        setSearchParams((prevSearchParams) => ({
          ...prevSearchParams,
          [name]: value,
        }));
      };

    return (

        <div className={`${styles.card} ${styles.workoutCard}`}>
        <h2>Search for Workouts</h2>
        <div className={styles.workoutImages}>
          <Link href="/name=&muscle=Biceps&category=&difficulty=&force="><div><h3>Biceps</h3></div></Link>
          <Link href="/name=&muscle=Triceps&category=&difficulty=&force="><div><h3>Triceps</h3></div></Link>
          <Link href="/name=&muscle=Forearms&category=&difficulty=&force="><div><h3>Forearms</h3></div></Link>
          <Link href="/name=&muscle=Shoulders&category=&difficulty=&force="><div><h3>Shoulders</h3></div></Link>
          <Link href="/name=&muscle=Quads&category=&difficulty=&force="><div><h3>Quads</h3></div></Link>
          <Link href="/name=&muscle=Glutes&category=&difficulty=&force="><div><h3>Glutes</h3></div></Link>
        </div>
        <div className={styles.lineBreak}>
          <hr style={{border: "3px solid black", borderRadius: "10px"}}></hr>
          <p style={{fontWeight: "bold", fontSize: "1.5rem"}}>or</p>
          <hr style={{border: "3px solid black", borderRadius: "10px"}}></hr>
        </div>
        <div className={styles.searchFilter}>
          <Select 
            className={drop.categories}
            defaultValue={categories[0]}
            options={categories}
            onChange={(e) => handleInputChange("category", e.value)}
            styles={{
                borderRadius: "20px",
                border: "3px solid black"
            }}
            />
          <Select 
            className={drop.categories}
            defaultValue={difficulties[0]}
            options={difficulties}
            onChange={(e) => handleInputChange("difficulty", e.value)}

            />
          <Select 
            className={drop.categories}
            defaultValue={forces[0]}
            options={forces}
            onChange={(e) => handleInputChange("force", e.value)}
            />
          <Select 
            className={drop.categories}
            defaultValue={muscles[0]}
            options={muscles}
            onChange={(e) => handleInputChange("muscle", e.value)}
            />

          <input 
            placeholder="Search by Name.."
            type='text' 
            className={styles.searchBar} 
            onChange={(e) => handleInputChange("name", e.target.value)}
            >
          </input>

          <button className={styles.button} onClick={() => location.href =`/name=${searchParams.name}&muscle=${searchParams.muscle}&category=${searchParams.category}&difficulty=${searchParams.difficulty}&force=${searchParams.force}`}>Search</button>
        </div>
      </div>
    )
}