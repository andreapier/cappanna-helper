function selectIsAdmin(state) {
  return state.user.roles.some((r) => r === "admin");
}

function selectIsAdminOrDome(state) {
  return state.user.roles.some((r) => r === "admin" || r === "dome");
}

export { selectIsAdmin, selectIsAdminOrDome };