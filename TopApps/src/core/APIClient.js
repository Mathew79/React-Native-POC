

var APIStatus = {
  PROCESSING : 0,
  ERROR : 1,
  SUCCESS : 2
}


export function APIClient(method, baseUrl, requestParam, parser) {

  return (dispatch,dispatcher) => {
    dispatcher(dispatch,APIStatus.PROCESSING,null)

    var myInit = {
      method: 'GET',
      //headers: myHeaders,
      //mode: 'cors',
      cache: 'default'
    };

    var myRequest = new Request(baseUrl, myInit);

    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        //dispatch(itemsIsLoading(false));

        return response;
      })
      .then((response) => response.json())
      .then((items) => {
        let data = parser(items);
        dispatcher(dispatch,APIStatus.SUCCESS,data)
      })
      .catch((error) => {
        dispatcher(dispatch,APIStatus.ERROR,error)
       // console.error(error);
      });
    //.catch(() => dispatch(itemsHasErrored(true)));
  };
}
