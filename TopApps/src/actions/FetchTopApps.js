import * as API from '../core/APIClient';
import { AppRecord } from '../model/AppRecord';

export class FetchTopApps{
    

    constructor(props){
        //Url = 'http://phobos.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/toppaidapplications/limit=200/json';
    }
    
    
    requestParam() {
        return {}
    }
    
     parser(items) {
        var appsArray = [];
    
        items.feed.entry.forEach(function (element) {
            var apps = new AppRecord();
            apps.key = element.id.attributes['im:id'];
            apps.appName = element['im:name'].label;
            apps.artist = element['im:artist'].label;
            apps.imageURLString.small = element['im:image'][0].label;
            apps.imageURLString.large = element['im:image'][2].label;
            apps.copyRights = element.rights.label;
            apps.releaseDate = element['im:releaseDate'].attributes.label;
            apps.price = element['im:price'].label;
            apps.summary = element.summary.label;
            apps.contentType = element['im:contentType'].attributes.label;
            appsArray.push(apps);
        }, this);
    
    
        return appsArray;
    }
    
     fetchData() {
        return API.APIClient('GET', Url, this.requestParam, this.parser);
    }
   
}