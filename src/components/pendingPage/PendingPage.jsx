import Header from "../header/Header";
import RegAuthFooter from '../footer/RegAuthFooter'
import ReactLoading from 'react-loading'


const PendingPage = ({ text }) => {
    return (
        <>
            <div className='wrapper'>
                <Header />
                <div className='main'>
                        <ReactLoading type='bubbles' color='#4482B9' height={150} width={150} />
                </div>
                <RegAuthFooter />
            </div>
        </>
    )
}

export default PendingPage;