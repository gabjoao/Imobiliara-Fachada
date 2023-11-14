var data = [];

for(var x = 0; x < localStorage.length; x++){
    data.push(JSON.parse(localStorage.getItem(localStorage.key(x))));    
    addElement(x);

}

let btnResetar = document.querySelector(".resetar");
if(data.length > 0){
    btnResetar.style.display = "block";
}

//Classe super Imóvel
class Imovel{
    constructor(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, foto, preco){
        this.titulo = titulo;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.cep = cep;
        this.quartos = quartos;
        this.banheiros = banheiros;
        this.garagem = garagem;
        this.foto = foto;
        this.preco = preco;
    }
}


//Classe Casa
class Casa extends Imovel{
    constructor(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, foto, preco, terreno, construido){

        super(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, foto, preco);
 
        this.terreno = terreno;
        this.construido = construido;
    }

}


//Classe Apartamento
class Apartamento extends Imovel{
    constructor(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, foto, preco, metragem, condominio){

        super(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, foto, preco);

        this.metragem = metragem;
        this.condominio = condominio;
    }

}


var maiorChave = 0;
for(var x = 0; x <= localStorage.length; x++){
    if(localStorage.key(x) > maiorChave){
        maiorChave = localStorage.key(x);

    }
}


const btn = document.querySelector("#cadastrar-btn");
//Função para resgatar os dados
btn.addEventListener("click", function(e){
    //Função para não resetar a página no click
    e.preventDefault();


    //Adicionando o botão de remover
    btnResetar.style.display = "block";

    //Resgate dos dados
    const titulo = document.querySelector("#titulo").value;
    
    const rua = document.querySelector("#rua").value;

    const numero = document.querySelector("#numero").value;

    const bairro = document.querySelector("#bairro").value;

    const cep = document.querySelector("#CEP").value;

    const quartos = document.querySelector("#quartos").value;

    const banheiros = document.querySelector("#banheiros").value;
    
    const garagem = document.querySelector("#garagem").value;

    var foto = document.querySelector("#foto").files[0];
    blob = new Blob([foto], {type: "image/jpeg"});
    var url = URL.createObjectURL(blob);

    url.onload = () => {
        URL.revokeObjectURL(blob);
      };

    const preco = document.querySelector("#preco").value;


    //Criação dos objetos
    if(document.getElementById("casa").checked){
        const terreno = document.querySelector("#terreno").value;
        const construido = document.querySelector("#construido").value;


        data.push(new Casa(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, url, preco, terreno, construido));

    } else if(document.getElementById("apartamento").checked){
        const metragem = document.querySelector("#metragem").value;
        const condominio = document.querySelector("#condominio").value;

        data.push(new Apartamento(titulo, rua, numero, bairro, cep, quartos, banheiros, garagem, url, preco, metragem, condominio)); 
    }
    //Vereficar se o tamanho do localStorage é igual a alguma das chaves,
    //se for, pula 1 até for diferente

    for(var x = 0; x <= localStorage.length; x++){
        if(localStorage.key(x) > maiorChave){
            maiorChave = localStorage.key(x);
    
        }
    }

    console.log("maior chave " + maiorChave)
    console.log("lengh " + localStorage.length);

    if(localStorage.length < 1){
        localStorage.setItem(localStorage.length+1, JSON.stringify(data[data.length-1]));
        console.log("storage vazio")
       }

   

    for(var x = 1; x <= maiorChave; x++){
        console.log(x);
        console.log("a chave é " + localStorage.key(x))
        
        

        if(localStorage.key(x) == null && localStorage.length != maiorChave){
            //console.log(localStorage.key(x))
            console.log("padrão")
            localStorage.setItem(x-1, JSON.stringify(data[data.length-1]));
            break;
        }

        else if(maiorChave > localStorage.length && localStorage.key(x) == null){
            localStorage.setItem(x, JSON.stringify(data[data.length-1]));
            break;
        }
       
        else if(localStorage.length == maiorChave){
            console.log("length é igual maior chave")
            localStorage.setItem(localStorage.length+1, JSON.stringify(data[data.length-1]));
            break;

        }

        else if(localStorage.key(x) == null && maiorChave != localStorage.length && localStorage.key(x) != Number(localStorage.key(x+1))){
            console.log("chave igual ao x")
            localStorage.setItem(x+1, JSON.stringify(data[data.length-1])); 
            
        }
    }

    addElement(data.length-1);

})


//Ativar / Desativar os inputs, dependendo de qual objeto for criar
document.getElementById("casa").addEventListener("click", function(){
    document.getElementById("metragem").setAttribute("disabled", "disabled");
    document.getElementById("condominio").setAttribute("disabled", "disabled");

    document.getElementById("terreno").removeAttribute("disabled");
    document.getElementById("construido").removeAttribute("disabled");
})

document.getElementById("apartamento").addEventListener("click", function(){
    document.getElementById("terreno").setAttribute("disabled", "disabled");
    document.getElementById("construido").setAttribute("disabled", "disabled");

    document.getElementById("metragem").removeAttribute("disabled");
    document.getElementById("condominio").removeAttribute("disabled");
})



//Inserir na página os imóveis cadastrados
function addElement(x){
    //Criação do Card
    var imovelDiv = document.createElement("div");
    imovelDiv.className = "card";

    //Botão para excluir imóvel
    var excluir = document.createElement("div");
    excluir.className = "excluir-btn"
    excluir.setAttribute("onclick", "excluir("+ localStorage.key(x) +")") ;
    imovelDiv.appendChild(excluir);

    //Colocando o Título com o número que representa o imóvel
    var cardTitulo = document.createElement("h2");
    cardTitulo.textContent = "Imóvel " + (x+1);
    imovelDiv.appendChild(cardTitulo);

    //Organizando os conteúdos do card
    var content = document.createElement("div");
    content.className = "card-content";
    imovelDiv.appendChild(content);

    var asideImagem = document.createElement("aside");
    asideImagem.className = "aside-imagem";
    content.appendChild(asideImagem);

    asideImagem.style.backgroundImage = "url('"+data[x].foto+"')";

        //Organizando as informações
        var asideTextos = document.createElement("aside");
        asideTextos.className = "aside-textos";
        content.appendChild(asideTextos);

            //Título do imóvel
            var cardTitulo = document.createElement("h3");
            cardTitulo.textContent = "Título: " + data[x].titulo;
            asideTextos.appendChild(cardTitulo);
                
            var infosContainer = document.createElement("div");
            infosContainer.className = "infos-container";
            asideTextos.appendChild(infosContainer);

                var infosContent1 = document.createElement("aside");
                infosContent1.className = "infos-content1";
                infosContainer.appendChild(infosContent1);

                    var infosElement1 = document.createElement("div");
                    infosElement1.className = "infos-element1";
                    infosContent1.appendChild(infosElement1);

                        //Endereço
                        //Rua
                        var cardRua = document.createElement("p");
                        cardRua.textContent = "Rua " + data[x].rua + " " + data[x].numero;
                        infosElement1.appendChild(cardRua);

                        //Bairro
                        var cardBairro = document.createElement("p");
                        cardBairro.textContent = "Bairro " + data[x].bairro;
                        infosElement1.appendChild(cardBairro);

                        //CEP
                        var cardCep = document.createElement("p");
                        cardCep.textContent = "CEP: " + data[x].cep.slice(0, 5) + "-" + data[x].cep.slice(5);
                        infosElement1.appendChild(cardCep);
                        

                    var infosElement2 = document.createElement("div");
                    infosElement2.className = "infos-element2";
                    infosContent1.appendChild(infosElement2);

                        //Características
                        //Quantdade de Quartos
                        var cardQuartos = document.createElement("p");
                        cardQuartos.textContent = "Quartos: " + data[x].quartos;
                        infosElement2.appendChild(cardQuartos);

                        //Quantidade de Banheiros
                        var cardBanheiros = document.createElement("p");
                        cardBanheiros.textContent = "Banheiros: " + data[x].banheiros;
                        infosElement2.appendChild(cardBanheiros);

                        //Quantidade de Garagens
                        var cardGaragens = document.createElement("p");
                        cardGaragens.textContent = "Garagens: " + data[x].garagem;
                        infosElement2.appendChild(cardGaragens);

                var infosContent2 = document.createElement("aside");
                infosContent2.className = "infos-content2";
                infosContainer.appendChild(infosContent2);

                    //Informações
                    //Preço
                    var cardPreco = document.createElement("p");
                    cardPreco.textContent = "Preço : R$" + data[x].preco;
                    infosContent2.appendChild(cardPreco);

                    //Se for casa
                    if(data[x].condominio == undefined){
                        //Área do Terreno
                        var cardTerreno = document.createElement("p");
                        cardTerreno.textContent = "Área do Terreno: " + data[x].terreno + "m²";
                        infosContent2.appendChild(cardTerreno);

                        //Área Construido
                        var cardConstruido = document.createElement("p");
                        cardConstruido.textContent = "Área construída: " + data[x].construido + "m²";
                        infosContent2.appendChild(cardConstruido);
                    }
                    //Se for apartamento
                    else{
                        //Metragem
                        var cardMetragem = document.createElement("p");
                        cardMetragem.textContent = "Metragem: " + data[x].metragem + "m²";
                        infosContent2.appendChild(cardMetragem);
                        
                        //Condominio
                        var cardCondominio = document.createElement("p");
                        cardCondominio.textContent = "Condomínio " + data[x].condominio;
                        infosContent2.appendChild(cardCondominio);
                    }

    //Inserindo o Card no documento
    document.getElementById("imoveis-container").appendChild(imovelDiv);

}

//Função para resetar os cadastros
function resetar(){
    localStorage.clear();
    data.length = 0;
    console.log(data);
    window.location.reload(false);

}

//Função para excluir um imóvel
function excluir(x){
    localStorage.removeItem(x);
    data.slice(1, x);
    window.location.reload(false);

}