import {Routes, Route} from 'react-dom'
import {LandingHome} from '../features/landing/pages/landingHome'

export const AppRoutes = () => {

    return(

        <Route path="/" element={<LandingHome />} />

    )

}



