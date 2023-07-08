"use client"

import { setRevalidateHeaders } from 'next/dist/server/send-payload';
import { useEffect, useState } from 'react';
import {usePathname, useRouter} from "next/navigation"

import Item from './items';

import styles from './page.module.css'
import Link from 'next/link';
import Image from 'next/image';
// todo:
// call api before loading the website [/]
// link [/] ex: /name=&muscle=Biceps&category=Dumbbells&difficulty=Beginner&force=Pull
// paginization [/]

export default function Page() {

    // const router = useRouter();
    
    const [result, setResult] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);


    // Fetch data from API
    const path = usePathname();
    
    const getParams = async () => {
        const keyValuePairs = path.slice(1).split('&');
        // const [key, page] = keyValuePairs.pop().split('='); 
        // console.log(`current page: ${page}`)
        // setCurrentPage(page);
        const values = {
            name: "",
            muscle: "",
            category: "",
            difficulty: "",
            force: ""
        };
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            values[key] = value;
        });
        console.log("GET PARAMS")
        return values;
    }
    
    const fetchData = async () => {

        const axios = require('axios');
        const a = await getParams();
        console.log(`A: ${a}`)
        console.log(a)
        const options = {
            method: 'GET',
            url: 'https://musclewiki.p.rapidapi.com/exercises',
            params: a,
            headers: {
              'X-RapidAPI-Key': '2585f353a7msh55d4728ef0bfef2p14ee97jsn91e2aa2a535f',
              'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
            }
          };
          
        try {
            const response = await axios.request(options);
            setResult(response.data);
        } catch (e) {
            console.log(e);
            <Error />
        }
    
    }

    useEffect(() => {
        fetchData();
    }, []);

    // update current page data
    useEffect(() => {
        setCurrentData(result.slice(startIndex, endIndex));
        console.log(currentData);

        console.log(startIndex);
        console.log(endIndex);
        console.log(result.slice(startIndex, endIndex));
    }, [startIndex, result]);

    const updateIndex = () => {
        if (currentPage == Math.ceil(result.length / itemsPerPage)) {
            setEndIndex(result.length - 1);
            setStartIndex((result.length - 1) - (result.length % itemsPerPage));
        } else {
            setEndIndex((currentPage*itemsPerPage) - 1);
            setStartIndex((currentPage*itemsPerPage) - itemsPerPage);
        }
        
    }
    
    const previousPage = () => {
        setCurrentPage(currentPage - 1);
        console.log("PREVIOUS PAGE ACTIVATED")
    }
    
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        console.log("NEXT PAGE ACTIVATED")
    }
    
    useEffect(() => {
        updateIndex();
    }, [currentPage])
    
    const lastPage = (result.length === 0) ? currentPage : Math.ceil(result.length / itemsPerPage);

    console.log(`last page: ${lastPage}`);
    console.log(`Result length: ${result.length}`);
    return (
        
        <div className={styles.main}>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link href={'/'}>
                        <div className={styles.home_nav}>
                            <div className={styles.home_logo}>
                                <Image src="/../favicon.ico" width={35} height={35} /> 
                            </div>
                            <h1>Workout Finder</h1>
                        </div>
                    </Link>
                    <div className={styles.page_nav}>
                        <button disabled={currentPage == 1} onClick={(e) => {
                            e.preventDefault();
                            previousPage();
                        }}>&lt;&lt;</button>
                        <div>
                            {currentPage} of {lastPage}
                        </div>
                        <button disabled={currentPage === lastPage} onClick={(e) => {
                            e.preventDefault(); 
                            nextPage();
                        }}>&gt;&gt;</button>
                    </div>


                </nav>
            </header>

            {
                (result.length > 0 && currentPage <= lastPage && currentPage >= 1) ? 
                    
                    currentData.map((item) => {
                        return <Item key={item.id} item={item} />


                    })
                    
                :  <p>NO WORKOUTS FOUND..try checking your search filter</p>

            }
                



        </div>
    

    )

}
