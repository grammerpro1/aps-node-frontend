import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from "./../constants/flashMessages";

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message: message
  };
}

export function deleteFlashMessage(id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
}
