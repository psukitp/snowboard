import Header from "../header/Header";
import Footer from "../footer/Footer";


const PendingPage = () => {
    return (
        <>
            <div className='wrapper'>
                <Header bgColor='#fff' />
                <div className='main'>
                    <div>Загрузка...</div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default PendingPage;