import { IMaskInput } from "react-imask";
import { useState } from "react";

const BindingProperty = ({ changeProperties }) => {
    const [fields, setFields] = useState({ size: '', flex: '' });

    const handleInputChange = ({ target }) => {
        if (target.name === 'size') {
            setFields({ ...fields, size: target.value }, changeProperties({ ...fields, size: target.value }))
        } else {
            setFields({ ...fields, flex: target.value }, changeProperties({ ...fields, flex: target.value }))
        }
    }
    return (
        <>
            <div className="properties">
                <div className="create__resale-label">Размер</div>
                <input className="snowboard__input create__resale-input" name="size" placeholder="M" value={fields.size} onChange={handleInputChange} />
                <div className="create__resale-label">Жесткость</div>
                <IMaskInput mask='00' className="snowboard__input create__resale-input" name="flex" placeholder='от 0 до 10' value={fields.flex} onChange={handleInputChange} />
            </div>
        </>
    )
}

export default BindingProperty;