import { createSelector } from "reselect";

const selectIsAdmin = createSelector(
  [state => state.user.roles],
  roles => roles.some(r => r === "admin"));
const selectIsAdminOrDome = createSelector(
  [state => state.user.roles],
  roles =>  roles.some((r) => r === "admin" || r === "dome"));

export { selectIsAdmin, selectIsAdminOrDome };