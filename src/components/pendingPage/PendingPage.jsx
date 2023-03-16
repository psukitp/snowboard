import Header from "../header/Header";
import Footer from "../footer/Footer";
import ReactLoading from 'react-loading'


const PendingPage = ({ text }) => {
    return (
        <>
            <div className='wrapper'>
                <Header bgColor='#fff' />
                <div className='main'>
                        <ReactLoading type='bubbles' color='#4482B9' height={150} width={150} />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PendingPage;