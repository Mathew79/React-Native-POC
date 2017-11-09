import { combineReducers } from 'redux';
import { topApps , wishList ,priceButton} from '../reducers/TopApp'

const AppReducer = combineReducers({
    topApps,
    wishList,
    priceButton,
})

export default AppReducer;