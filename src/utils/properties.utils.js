const getResalePtoperties = (resale) => {
    let properties = [];
    if (resale.ad_product_type === 1) {
        properties.push({ name: 'Длина', value: resale.board_size })
        properties.push({ name: 'Прогиб', value: resale.board_deflection })
        properties.push({ name: 'Жесткость', value: resale.board_flex })
    } else if (resale.ad_product_type === 3) {
        properties.push({ name: 'Размер', value: resale.shoe_size })
        properties.push({ name: 'Жесткость', value: resale.shoe_flex })
    } else if (resale.ad_product_type === 4) {
        properties.push({ name: 'Размер', value: resale.binding_size })
        properties.push({ name: 'Жесткость', value: resale.binding_flex })
    } else if (resale.ad_product_type === 5) {
        properties.push({ name: 'Тип', value: resale.clothes_name })
        properties.push({ name: 'Размер', value: resale.clothes_size })
    }
    return properties;
}

export const propertiesUtils = { getResalePtoperties }