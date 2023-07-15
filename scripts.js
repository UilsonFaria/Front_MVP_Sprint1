/*
  --------------------------------------------------------------------------------------
  Função para obter a lista de Discos cadastrados via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5001/discos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.Discos.forEach(item => insertList(item.artista, 
                                             item.titulo, 
                                             item.gravadora, 
                                             item.quantidade_faixas, 
                                             item.ano_lancamento, 
                                             item.origem, 
                                             item.promo, 
                                             item.valor, 
                                             item.observacao))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para incluir um Disco na lista e na base de dados via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputArtista, 
                        inputTitulo, 
                        inputGravadora, 
                        inputFaixas, 
                        inputAno, 
                        inputOrigem, 
                        inputPromo, 
                        inputValor, 
                        inputObservacao) => 
{
  const formData = new FormData();
  formData.append('artista', inputArtista);
  formData.append('titulo', inputTitulo);
  formData.append('gravadora', inputGravadora);
  formData.append('faixas', inputFaixas);
  formData.append('ano', inputAno);
  formData.append('origem', inputOrigem);
  formData.append('promo', inputPromo);
  formData.append('valor', inputValor);
  formData.append('observacao', inputObservacao);

  let url = 'http://127.0.0.1:5001/disco';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão delete para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um Disco da lista de acordo com o click no botão delete
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;

      //console.log(div.getElementsByTagName('td')[0].innerHTML);
      //console.log(div.getElementsByTagName('td')[1].innerHTML);
      //console.log(div.getElementsByTagName('td')[2].innerHTML);
      //console.log(div.getElementsByTagName('td')[3].innerHTML);

      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Confirma a remoção do Disco?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Disco removido com sucesso!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um Disco da lista e da base de dados via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5001/disco?titulo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo Disco na lista
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputArtista = document.getElementById("newArtista").value;
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputGravadora = document.getElementById("newGravadora").value;
  let inputFaixas = document.getElementById("newFaixas").value;
  let inputAno = document.getElementById("newAno").value;
  let inputOrigem = document.getElementById("newOrigem").value;
  let inputPromo = document.getElementById("newPromo").value;
  let inputValor = document.getElementById("newValor").value;
  let inputObservacao = document.getElementById("newObservacao").value;

  if (inputArtista === '') {
    alert("Informe o nome do Artista!");
  } 
  else if (inputTitulo === '') {
    alert("Informe o título do Disco!");
  }  
  else if (inputGravadora === '') {
    alert("Informe a gravadora do Disco!");
  }  
  else if (inputOrigem === '') {
    alert("Informe a gravadora do Disco!");
  }
  else if (inputPromo === '') {
    alert("Informe a gravadora do Disco!");
  }
  else if (isNaN(inputFaixas) || isNaN(inputAno) || isNaN(inputValor)) {
    alert("Faixas do Disco, ano e valor precisam ser números!");
  } 
  else {
    insertList(inputArtista, 
               inputTitulo, 
               inputGravadora, 
               inputFaixas, 
               inputAno, 
               inputOrigem, 
               inputPromo, 
               inputValor, 
               inputObservacao)
    
    postItem(inputArtista, 
             inputTitulo, 
             inputGravadora, 
             inputFaixas, 
             inputAno, 
             inputOrigem, 
             inputPromo, 
             inputValor, 
             inputObservacao)

    alert("Disco adicionado com sucesso!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir discos na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (artista, titulo, gravadora, quantidade_faixas, ano_lancamento, origem, promo, valor, observacao) => {
  var item = [artista, titulo, gravadora, quantidade_faixas, ano_lancamento, origem, promo, valor, observacao]
  var table = document.getElementById('tabDisco');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newArtista").value = "";
  document.getElementById("newTitulo").value = "";
  document.getElementById("newGravadora").value = "";
  document.getElementById("newFaixas").value = "";
  document.getElementById("newAno").value = "";
  document.getElementById("newOrigem").value = "";
  document.getElementById("newPromo").value = "";
  document.getElementById("newValor").value = "";
  document.getElementById("newObservacao").value = "";

  removeElement()
}