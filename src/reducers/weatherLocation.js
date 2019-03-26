const weatherLocation = (state = [], action) => {
    switch (action.type) {
        case 'GET_LOCATION':
            return action.data
        default:
            return state
    }
}

export default weatherLocation