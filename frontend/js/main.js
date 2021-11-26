var dados_protocolo = {
    "protocolo": "123",
    "data": "01/01/01",
    "hora": "01:01:01",
    "cliente": "Cliente",
    "tecnico": "Técnico",
    "acompanhamentos": {
        "1": "Em verificação",
        "2": "Problema solucionado"
    }
}

function showLogin() {
    $("#tela-login").show("fast");
    $("#tela-registro-defeitos").hide();
    $("#tela-situacao-protocolo").hide();
    $("#tela-lista-servicos").hide();
    $("#tela-area-restrita").hide();
    $("#tela-cadastro-cliente").hide();    
}

function showRegProb() {
    $("#tela-registro-defeitos").show();
}

function showSitProt() {
    $("#tela-situacao-protocolo").show();
}

function showListaServ() {
    $("#tela-lista-servicos").show();
}

function showAreaRestrita() {
    $("#tela-area-restrita").show();
}

function showCadCli() {
    $("#tela-cadastro-cliente").show();
}

function hideLogin() {
    $("#tela-login").hide("fast");
}

function hideRegProb() {
    $("#tela-registro-defeitos").hide("fast");
}

function hideSitProt() {
    $("#tela-situacao-protocolo").hide("fast");
}

function hideListaServ() {
    $("#tela-lista-servicos").hide("fast");
}

function hideAreaRestrita() {
    $("#tela-area-restrita").hide("fast");
}

function hideCadCli() {
    $("#tela-cadastro-cliente").hide("fast");
}

showLogin();
$("#div-func").hide();



function atualizaTabela(id_func) {
    
    if (!id_func) {
        dados_protocolo.forEach(item => {
            $("#tblservicos").append("<tr><td>"+item.protocolo+"</td><td>"+item.cliente+"</td><td>"+item.tecnico+"</td><td><a href='#'>Ver</a></td></tr>");
        });
    }

}

$("#btn_table").on("click", function() {
    $("#tblservicos").append("<tr><td>1</td><td>Cliente Teste</td><td>Funcionario</td><td><a href='#'>Ver</a></td></tr>");
});

$("#btn_limpar").on("click", function() {
    $("#tblservicos tr").remove();
    $("#tblservicos").append("<tr><th class='w100px'>Protocolo</th> <th class='w255'>Cliente</th><th class='w140'>Requerente</th><th>Opções</th></tr>");
});

$("#lnk-con-prot").on("click", function(){
    $("#div-prot").show();
    $("#lnk-con-prot").addClass("selected");
    $("#lnk-ac-func").removeClass("selected");
    $("#div-func").hide();
});

$("#lnk-ac-func").on("click", function(){
    $("#div-func").show();
    $("#lnk-ac-func").addClass("selected");
    $("#lnk-con-prot").removeClass("selected");
    $("#div-prot").hide();
});

$("#frm-prot").on("submit", function(e) {
    e.preventDefault();
    console.log("Consulta Protocolo");

    var protocolo = $("#protocolo").val();

    if(protocolo == "123") {
        hideLogin();
        $("#tela-situacao-protocolo").show();

        $("#prot").text(dados_protocolo.protocolo);
        $("#data").text(dados_protocolo.data);
        $("#hora").text(dados_protocolo.hora);
        $("#cliente").text(dados_protocolo.cliente);
        $("#tecnico").text(dados_protocolo.tecnico);
        $("#acompanhamentos").text(JSON.stringify(dados_protocolo.acompanhamentos));
    } else {
        alert("Número de protocolo inválido");
        showLogin();
    }
});

$("#btn-voltar").on("click", function() {
    showLogin();
    hideSitProt();
});

$("#btn-logoff").on("click", function() {
    showLogin();
    hideAreaRestrita();
});

$("#btn-cad-cli").on("click", function() {
    hideAreaRestrita();
    showCadCli();
});

$("#btn-reg-prob").on("click", function() {
    hideAreaRestrita();
    showRegProb();
});

$("#btn-cancelar").on("click", function() {
    hideCadCli();
    showAreaRestrita();
});

$("#frm-func").on("submit", function(e) {
    e.preventDefault();
    console.log("Login");

    var login = $("#email").val();
    var senha = $("#senha").val();

    if(login === "tecnico@msp.com" && senha === "123123") {
        hideLogin();
        $("#tela-lista-servicos").show();
    } else if(login === "admin@msp.com" && senha === "123123") {
        hideLogin();
        $("#tela-area-restrita").show();
    } else {
        alert("Usuário ou senha inválidos");
        showLogin();
    }
});
