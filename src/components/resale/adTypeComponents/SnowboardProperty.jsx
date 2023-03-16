import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";

const SnowboardProperty = ({ changeProperties, takeProperties }) => {
    const [fields, setFields] = useState({ length: '', deflection: '', flex: '' });

    const handleInputChange = ({ target }) => {
        if (target.name === 'length') {
            setFields({ ...fields, length: target.value }, changeProperties({ ...fields, length: target.value }))
        } else if (target.name === 'flex') {
            setFields({ ...fields, flex: target.value }, changeProperties({...fields, flex: target.value}))
        } else {
            setFields({ ...fields, deflection: target.value }, changeProperties({...fields, deflection: target.value}))
        }
    }



    return (
        <>
            <div className="properties">
                <div className="create__resale-label">Ростовка</div>
                <IMaskInput mask='000' className="create__resale-input" name="length" placeholder='150' value={fields.length}  onChange={handleInputChange} />
                <div className="create__resale-label">Прогиб</div>
                <input className="create__resale-input" name="deflection" placeholder="Flat" value={fields.deflection} onChange={handleInputChange} />
                <div className="create__resale-label">Жесткость</div>
                <IMaskInput mask='00' className="create__resale-input" name="flex" placeholder='от 0 до 10' value={fields.flex} onChange={handleInputChange} />
            </div>
        </>
    )
}

export default SnowboardProperty;