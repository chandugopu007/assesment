const measurement = (state = {}, action) => {
    switch (action.type) {
        case 'MEASUREMENT_RECEIVED':
            return action.json
        default:
            return state
    }
}

export default measurement