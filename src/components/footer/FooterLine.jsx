import './footerLine.css'



const FooterLine = ({ bgColor, width, textColor }) => {
    return (
        <>
            <div style={{ backgroundColor: bgColor }}>
                <hr className='hr__line' style={{ maxWidth: width }} />
                <div className='auth__copyright' style={{ color: textColor }}>
                    © Copyright 2023
                </div>
            </div>
        </>
    )
}

export default FooterLine;