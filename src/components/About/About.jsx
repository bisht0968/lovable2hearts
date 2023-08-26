import "./About.scss"

import Banner from '../Banner/Banner'
import { useContext } from "react"
import { AppContext } from "../../utils/Context"

export default function About() {

    const { heading } = useContext(AppContext)

    return (
        <div className='aboutSection'>
            <div className="aboutContent">
                <div className="heroBanner">
                    <Banner heading={heading} />
                </div>
            </div>
        </div>
    )
}
