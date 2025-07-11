const tabela = document.getElementById("planilha");

fetch("data.json")
  .then((res) => res.json())
  .then(async (data) => {
    const headers = Object.keys(data[0]);
    const headerRow = `<tr>${headers
      .map((h) => `<th>${h}</th>`)
      .join("")}<th>Comentário</th></tr>`;
    tabela.innerHTML = headerRow;

    for (const row of data) {
      const linhaId = row.linha_id;
      const rowHtml = `<tr>${headers
        .map((h) => `<td>${row[h]}</td>`)
        .join(
          ""
        )}<td><a target="_blank" href="https://github.com/SEU_USUARIO/SEU_REPO/issues/new?title=[Feedback]%20Linha%20${linhaId}&labels=linha:${linhaId},planilha:template">Comentar</a></td></tr>`;
      tabela.innerHTML += rowHtml;
    }
  });
