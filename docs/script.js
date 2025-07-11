const tabela = document.getElementById("planilha");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");
const ifcNameEl = document.getElementById("modal-ifc-name");
const colunaSelect = document.getElementById("coluna");
const comentarioEl = document.getElementById("comentario");
const btnOk = document.getElementById("btn-ok");

let colunas = [];
let linhaSelecionada = null;
let linhaIndex = null;

const REPO = "spvmarcus/bim_comments"; // atualize com seu repositório

closeModal.onclick = () => modal.classList.add("hidden");
window.onclick = (e) => {
  if (e.target == modal) modal.classList.add("hidden");
};

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    colunas = Object.keys(data[0]);
    tabela.innerHTML = `<tr>${colunas
      .map((h) => `<th>${h}</th>`)
      .join("")}<th>Comentar</th></tr>`;

    for (const row of data) {
      const linhaId = row.linha_id;
      const rowHtml = `<tr>${colunas
        .map((h) => `<td>${row[h]}</td>`)
        .join("")}<td><button onclick="openModal(${linhaId}, ${JSON.stringify(
        row
      ).replace(/"/g, "&quot;")})">Comentar</button></td></tr>`;
      tabela.innerHTML += rowHtml;
    }

    // preencher dropdown de colunas
    colunaSelect.innerHTML = colunas
      .map((c) => `<option value="${c}">${c}</option>`)
      .join("");
  });

window.openModal = (linhaId, row) => {
  linhaSelecionada = row;
  linhaIndex = linhaId;
  const ifcName = row["IFC Property Name"] || "(Sem nome)";
  ifcNameEl.textContent = `${ifcName} (Linha ${linhaIndex})`;
  comentarioEl.value = "";
  modal.classList.remove("hidden");
};

btnOk.onclick = () => {
  const selectedCol = colunaSelect.value;
  const comentario = comentarioEl.value;
  const ifcName = linhaSelecionada["IFC Property Name"] || "(Sem nome)";

  const issueTitle = `[Feedback] Linha ${linhaIndex} - ${ifcName}`;
  const body = `
**IFC Property Name**: ${ifcName}
**Linha**: ${linhaIndex}
**Coluna**: ${selectedCol}
**Valor Atual**: ${linhaSelecionada[selectedCol]}

**Comentário**:
${comentario}
  `;

  const url = `https://github.com/${REPO}/issues/new?title=${encodeURIComponent(
    issueTitle
  )}&body=${encodeURIComponent(
    body
  )}&labels=linha:${linhaIndex},planilha:template`;

  window.open(url, "_blank");
  modal.classList.add("hidden");
};

// ---------------
// const tabela = document.getElementById("planilha");

// fetch("data.json")
//   .then((res) => res.json())
//   .then(async (data) => {
//     const headers = Object.keys(data[0]);
//     const headerRow = `<tr>${headers
//       .map((h) => `<th>${h}</th>`)
//       .join("")}<th>Comentário</th></tr>`;
//     tabela.innerHTML = headerRow;

//     for (const row of data) {
//       const linhaId = row.linha_id;
//       const rowHtml = `<tr>${headers
//         .map((h) => `<td>${row[h]}</td>`)
//         .join(
//           ""
//         )}<td><a target="_blank" href="https://github.com/spvmarcus/bim_comments/issues/new?title=[Feedback]%20Linha%20${linhaId}&labels=linha:${linhaId},planilha:template">Comentar</a></td></tr>`;
//       tabela.innerHTML += rowHtml;
//     }
//   });
