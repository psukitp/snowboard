import { useState } from "react";

const ClothesProperty = ({ changeProperties }) => {
    const [fields, setFields] = useState({ nameof: '', size: '' });

    const handleInputChange = ({ target }) => {
        if (target.name === 'nameof') {
            setFields({ ...fields, nameof: target.value }, changeProperties({ ...fields, nameof: target.value }))
        } else {
            setFields({ ...fields, size: target.value }, changeProperties({ ...fields, size: target.value }))
        }
    }
    return (
        <>
            <div className="properties">
                <div className="create__resale-label">Тип</div>
                <input className="snowboard__input create__resale-input" name="nameof" placeholder="Куртка" value={fields.nameof} onChange={handleInputChange} />
                <div className="create__resale-label">Размер</div>
                <input className="snowboard__input create__resale-input" name="size" placeholder="S" value={fields.size} onChange={handleInputChange} />
            </div>
        </>
    )
}

export default ClothesProperty;