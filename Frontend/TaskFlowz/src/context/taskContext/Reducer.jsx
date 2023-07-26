const Reducer = (state, action) => {
    switch( action.type ){
        case "PROFILE":
            return {
                ui: action.payload
            }
        case "ADD":
            return {
                ui: action.payload
            }
        case "TASKS":
            return {
                ui: action.payload
            }
        case "NOTIFICATION":
            return {
                ui: action.payload
            }
        default:
            return state;
    }
 }

export default Reducer;


    
