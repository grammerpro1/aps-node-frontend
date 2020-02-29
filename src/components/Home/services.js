import axios from "axios";
const url = "http://localhost:4001/api/apsUsers/";

export async function getMediosPagoComercio(idComercio) {
  return await axios.get(url + "consultaMpComercio", {
    params: {
      idComercio
    }
  });
}

export async function getMediosPagoUsuario(idUsuario) {
  return await axios.get(url + "consultaMpUsuario", {
    params: {
      idUsuario
    }
  });
}

export async function postAltaTarjetaUsuario(tarjeta) {
  return await axios.post(url + "altaTarjetaUsuario", tarjeta);
}

export async function postAltaUsuario(usuario) {
  return await axios.post(url + "signup", usuario);
}

export async function postLogin(usuario) {
  return await axios.post(url + "login", usuario);
}

export async function postCompra(transaction) {
  return await axios.post(url + "compra", transaction);
}
