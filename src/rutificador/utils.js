const { parse } = require("node-html-parser");

function parsearHTML(html, tipo) {
  const root = parse(html);
  let personas = root.querySelectorAll("tr").map((tr) => {
    const td = tr.querySelectorAll("td");
    let data;
    if (td.length > 0) {
      if (tipo === "personas") {
        data = {
          nombre: td[0].text,
          rut: td[1].text,
          sexo: td[2].text,
          direccion: td[3].text,
          comuna: td[4].text,
        };
      } else {
        data = {
          razonSocial: td[0].text,
          rubro: td[1].text,
          subrubro: td[2].text,
          actividades: td[3].text,
          rut: td[4].text,
        };
      }
    }
    return data;
  });
  personas = personas.filter(Boolean);
  return personas;
}
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkearCoincidenciaNombres(str1, str2) {
  str1 = removeAccents(str1.toLowerCase()).replace(/\s+/g, " ").trim();
  str2 = removeAccents(str2.toLowerCase()).replace(/\s+/g, " ").trim();
  const str1Array = str1.split(" ");
  const str2Array = str2.split(" ");
  return str1Array.every((w) => str2Array.includes(w));
}
module.exports = {
  parsearHTML,
  checkearCoincidenciaNombres,
  removeAccents,
};
