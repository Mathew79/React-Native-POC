import { FetchTopApps } from '../actions/FetchTopApps'

export class FetchTopGrossingApps extends FetchTopApps{

    constructor(props){
        super(props)
        Url = 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topgrossingapplications/limit=200/json';
    }
}

