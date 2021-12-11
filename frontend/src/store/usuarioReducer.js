const INITIAL_STATE = {
  usuarioId: "",
  usuarioLogado: 0,
};

function usuarioReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        usuarioLogado: 1,
        usuarioId: action.usuarioId,
        usuarioNome: action.usuarioNome,
        usuarioToken: action.usuarioToken,
      };
    case "LOGOUT":
      return { ...state, usuarioLogado: 0, usuarioId: null };
    default:
      return state;
  }
}

export default usuarioReducer;
