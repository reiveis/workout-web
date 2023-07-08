import styles from '../styles/page.module.css'

import Image from 'next/image'


export default function CreditsCard({url}) {


    return (
        <div className={`${styles.creditsCard} ${styles.card}`}>
            <ul style={{height: "100%"}}>
                <li>
                    <a href="https://www.linkedin.com/in/nor-danish-imran-nor-hisham-5ab046204/" target='_blank'><Image src={"../icons/linkedin_.svg"} width={25} height={25} alt='linkedin' />LinkedIn</a>
                </li>
                <li>
                    <a href="https://www.instagram.com/dan.imrn/" target='_blank'><Image src={`../icons/instagram_.svg`} width={25} height={25} alt='instagram' />Instagram</a>
                </li>
                <li>
                    <a href="https://github.com/virtualdann" target='_blank'><Image src={`../icons/github_.svg`} width={25} height={25} alt='github' />GitHub</a>
                </li>
            </ul>

      </div>
    )
}