

export function topApps(state = {}, action) {
  switch (action.type) {
    case 'RECEIVED_TOP_APPS':
      return { ...state, apps: action.apps, processig: false, errorOccured: false, error: null };
    case 'ERROR':
      return { ...state, processig: false, errorOccured: true, error: action.error };
    case 'PROCESSING':
      return { ...state, apps: action.apps, processig: true, errorOccured: false, error: null }
    default:
      return state
  }
}


const initialWishListState = {
  isPresentInStore: false,
  modalVisible: false,
  isfetching: false,
  count : 0,
  items: {}
}

export function wishList(state = initialWishListState, action) {
  switch (action.type) {
    case "OPEN_WISHLIST":
      return { ...state, modalVisible: true };
    case "FOUND_IN_STORE":
      return { ...state, isPresentInStore: true };
    case "NOT_FOUND_IN_STORE":
      return { ...state, isPresentInStore: false };
    case "ADDED_TO_STORE":
      return { ...state, isPresentInStore: true };
    case "FETCHED_FROM_STORE":
      return { ...state, isPresentInStore: true, items: action.items, isfetching: false,count : action.items.length};
    case "FETCHING_FROM_STORE":
      return { ...state, isPresentInStore: true, items: action.items, isfetching: true };
    default:
      return state;
  }
}


const initialPriceButtonState = {
  showAmount: true,
  showBuy: false,
  selectedItemKey: '',
}

export function priceButton(state = initialPriceButtonState, action) {
  switch (action.type) {
    case "SHOW_AMOUNT":
      return { ...state, showAmount: true, showBuy: false ,selectedItemKey:''};
    case "SHOW_BUY":
      return { ...state, showAmount: false, showBuy: true,selectedItemKey:action.item.key };
    default:
      return initialPriceButtonState;
  }
}