import { FetchTopApps } from '../actions/FetchTopApps'

export class FetchTopPaidApps extends FetchTopApps{

    constructor(props){
        super(props)
        Url = 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppaidapplications/limit=200/json';
    }
}