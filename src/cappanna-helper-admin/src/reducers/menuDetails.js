import { LOAD_MENU_DETAILS_COMPLETED } from 'actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LOAD_MENU_DETAILS_COMPLETED:
      return [ ...action.payload ];

    default:
      return state;
  }
}
