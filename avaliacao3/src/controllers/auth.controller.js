import gerarToken from "../utils/gerarToken.js";


function login(req, res) {
  const token = gerarToken({ usuario: "admin" }); 
  return res.status(200).json({ token });
}


export{
  login
};
