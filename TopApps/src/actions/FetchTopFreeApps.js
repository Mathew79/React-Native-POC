import { FetchTopApps } from '../actions/FetchTopApps'

export class FetchTopFreeApps extends FetchTopApps{

    constructor(props){
        super(props)
        Url = 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=200/json';
    }
}