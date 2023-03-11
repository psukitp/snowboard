import './footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        <img src={require('./img/logo.png')} alt="Логотип" />
                        <p className='text'>Сноубординг</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;