import { HIDE_MODAL, SHOW_MODAL } from "../constants";

const initialState = {
  modalData: null,
  modalProps: {
    title: "Default Title",
    isOpen: false,
    transitionDuration: 50,
    icon: null,
    cancelText: "Cancel",
    primaryText: "Ok",
    secondartyText: "Delete",
    isCloseButtonShown: true
  }
};

export default function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalProps: Object.assign({}, state, {
          ...action.modalProps,
          isOpen: true
        }),
        modalData: action.modalData
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
