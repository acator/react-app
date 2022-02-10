export let value = (value) => {
    switch (typeof value) {
        case "boolean":
            if (value === true) {
                return "да"
            } else if (value === false) {
                return "нет"
            }
        case "string":
            if (value) {
                return value
            }
        case 'object':
            return "не указан"
        default:
            return value
    }
}
