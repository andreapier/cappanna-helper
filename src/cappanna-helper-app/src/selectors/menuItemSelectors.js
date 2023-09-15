import { createSelector } from "reselect";

const makeSelectMenuItemsByGroup = () => {
  return createSelector(
    [state => state.menuDetails, (state, group) => group],
    (menuDetails, group) => menuDetails.filter(item => item.group === group)
  )
}

const selectNeedsMenuDetailsLoading = state => {
  return state.menuDetails.length === 0;
}

export { makeSelectMenuItemsByGroup, selectNeedsMenuDetailsLoading };