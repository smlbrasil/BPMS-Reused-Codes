$(document).ready(function () {

    //Utilizado para pegar o apelido da tarefa atual.
    var task = $("#inpDsFlowElementAlias").val();

});

/*
Fun��o respons�vel por esconder e desobrigar um campo.
Guarda se o campo � obrigat�rio em um atributo novo "xrequired".
@PARAM: @fieldID = identificador do campo/campos.
Ex de chamada: sml_Hide('nome,cpf');
*/
function sml_Hide(fieldID, clean) {
    if (fieldID !== "" && fieldID !== null && fieldID !== undefined) {
        var field;
        var xType;
        var tr;
        var btnDelFile;

        if (fieldID.indexOf(",") >= 0) {
            var Ids = fieldID.replace(' ', '');
            var arrayIds = Ids.split(',');

            for (var i = 0; i < arrayIds.length; i++) {
                field = $('inp:' + $.trim(arrayIds[i]));
                xType = field.attr("xtype");

                if (field.attr('type') !== 'hidden') {
                    field.closest('tr').hide();
                } else {
                    $('#td0' + $.trim(arrayIds[i])).hide();
                    $('#td1' + $.trim(arrayIds[i])).hide();
                }

                if (field.attr('xrequired') === undefined)
                    field.attr('xrequired', field[0].getAttribute('required'));

                if (field.attr('type') !== 'hidden')
                    field[0].setAttribute('required', 'N');

                if (clean) {

                    if (field.is('input')) {

                        if (field.attr('type') == 'text')
                            field.val('');

                        if (field.attr('type') == 'radio' || field.attr('type') == 'checkbox')
                            field.prop('checked', false);

                        if (xType && xType.toUpperCase() == "FILE") {
                            tr = field.closest('tr');
                            btnDelFile = tr.find('.btn-danger');

                            if (btnDelFile[0])
                                delFileFormField(arrayIds[i], btnDelFile[0]);

                        }
                        
                    } else if (field.is('select') || field.is('textarea')) {
                        field.val('');
                    }

                }

            }
        } else {
            field = $('inp:' + $.trim(fieldID));
            xType = field.attr("xtype");

            if (field.attr('type') !== 'hidden') {
                field.closest('tr').hide();
            } else {
                $('#td0' + $.trim(fieldID)).hide();
                $('#td1' + $.trim(fieldID)).hide();
            }
            if (field.attr('xrequired') === undefined)
                field.attr('xrequired', field[0].getAttribute('required'));

            if (field.attr('type') !== 'hidden')
                field[0].setAttribute('required', 'N');

            if (field.is('input')) {

                if (field.attr('type') === 'text')
                    field.val('');

                if (field.attr('type') === 'radio' || field.attr('type') === 'checkbox')
                    field.prop('checked', false);

                if (xType && xType.toUpperCase() == "FILE") {
                    tr = field.closest('tr');
                    btnDelFile = tr.find('.btn-danger');

                    if (btnDelFile[0])
                        delFileFormField(fieldID, btnDelFile[0]);
                }
                
            } else if (field.is('select') || field.is('textarea')) {
                field.val('');
            }

        }
        return field;
    }
}

/*
Fun��o respons�vel por mostrar e obrigar o campo se ele for obrigat�rio.
Resgata se o campo � obrigat�rio atraves do atributo novo "xrequired".
@PARAM: @fieldID = identificador do campo/campos.
Ex de chamada: sml_Show('nome,cpf');
*/
function sml_Show(fieldID) {
    if (fieldID !== "" && fieldID !== null && fieldID !== undefined) {
        var field;

        if (fieldID.indexOf(",") >= 0) {
            var Ids = fieldID.replace(' ', '');
            var arrayIds = Ids.split(',');

            for (var i = 0; i < arrayIds.length; i++) {
                field = $('inp:' + $.trim(arrayIds[i]));

                if (field.attr('type') !== 'hidden') {
                    field.closest('tr').show();
                } else {
                    $('#td0' + $.trim(arrayIds[i])).show();
                    $('#td1' + $.trim(arrayIds[i])).show();
                }

                if (field.attr("type") != '' && field.attr('type') != 'hidden' && field[0].getAttribute('xrequired') != null)
                    field[0].setAttribute('required', field[0].getAttribute('xrequired'));
            }

        } else {
            field = $('inp:' + $.trim(fieldID));

            if (field.attr('type') !== 'hidden') {
                field.closest('tr').show();
            } else {
                $('#td0' + $.trim(fieldID)).show();
                $('#td1' + $.trim(fieldID)).show();
            }

            if (field.attr("type") != '' && field.attr("type") != 'hidden' && field[0].getAttribute('xrequired') != null)
                field[0].setAttribute('required', field[0].getAttribute('xrequired'));
        }
        return field;
    }
}

/*
Esconde uma tabela/agrupamento inteiro, desobriga seus campos e limpa o valor se necess�rio.
Guarda se os campos da tabela s�o obrigat�rios em um novo atributo "data-isrequired";
@PARAM: @ids = identificador da tabela/tabelas.
@PARAM: @clean = true/false.
Ex de chamada: sml_hideTables('tblRepresentante,Dados da Solicitacao');
*/
function sml_hideTables(ids, clean) {
    clean = clean || false;

    function hideTablesProcess(id, clean) {
        var i = 0;
        var $tbl = $("table[id='" + id + "']");
        $tbl.hide();

        if (clean) {
            if ($tbl.attr("mult") === "S") {
                $tbl.find('tbody').find('tr').each(function () {
                    var $tr = $(this);

                    if (i > 1) {
                        DeleteRow($tr.find('button')[0]);
                    }
                    i++;
                });
            } else {
                $tbl.find('tbody').find('input').each(function () {
                    $(this).val('');
                });
            }
        }

        $tbl.find('input, select, textarea').each(function () {
            var tr = $(this).closest('tr');
            var id = $(this).attr("xname").replace('inp', '');
            var type = $(this).attr("type");
            var xtype = $(this).attr("xtype");

            if (type == undefined || type != "button") {
                var isrequired =
                    (
                        ($(this).attr("data-isrequired") != null && $(this).attr("data-isrequired") == "true")
                        || ($(this)[0].getAttribute("required") != null && $(this)[0].getAttribute("required") == "S")
                    ) ? true : false;

                $(this).attr("data-isrequired", isrequired);
                $(this)[0].setAttribute("required", "N");
                $(this).attr("class", "");

                if (clean && $(this).val() != "0,00")
                    $(this).val("");

                if (xtype && xtype.toUpperCase() == "FILE") {
                    var btnDelFile = tr.find('.btn-danger');

                    if (btnDelFile[0])
                        delFileFormField(id, btnDelFile[0]);
                }
            }
        });
    }

    if (ids !== "") {
        if (ids.indexOf(',') >= 0) {
            var arrayIds = ids.split(',');
            for (var i = 0; i < arrayIds.length; i++) {
                hideTablesProcess($.trim(arrayIds[i]), clean);
            }
        } else {
            hideTablesProcess($.trim(ids), clean);
        }
    }
}

/*
Mostra uma tabela/agrupamento inteiro e obriga seus campos se eles forem obrigat�rios.
Resgata se os campos da tabela s�o obrigat�rios em um novo atributo "data-isrequired";
@PARAM: @ids = identificador da tabela/tabelas.
@PARAM: @clean = true/false.
Ex de chamada: sml_showTables('tblRepresentante,Dados da Solicitacao');
*/
function sml_showTables(ids) {

    function showTablesProcess(id) {

        var i = 0;
        var $tbl = $("table[id='" + id + "']");
        $tbl.show();

        $tbl.find('input, select, textarea').each(function () {
            var $this = $(this);
            var type = $(this).attr("type");
            var wasrequired;

            if (type !== undefined && type !== "button" && type !== "hidden") {
                wasrequired = $(this).attr("data-isrequired");
                if (wasrequired !== null && wasrequired === "true") {
                    $this[0].setAttribute("required", "S");
                    $this.parents("td").attr("class", "obrigatorio");
                }
            }
            if ($(this).is('select')) {
                wasrequired = $(this).attr("data-isrequired");
                if (wasrequired !== null && wasrequired === "true") {
                    $this[0].setAttribute("required", "S");
                    $this.parents("td").attr("class", "obrigatorio");
                }
            }
        });
    }

    if (ids !== "") {
        if (ids.indexOf(',') >= 0) {
            var arrayIds = ids.split(',');
            for (var i = 0; i < arrayIds.length; i++) {
                showTablesProcess($.trim(arrayIds[i]));
            }
        } else {
            showTablesProcess($.trim(ids));
        }
    }
}

/*
Faz o append da mensagem no parent do campo (Fun��o geralmente utilizada por fun��es que validam campos).
@PARAM: @Obj = OBJ DO CAMPO.
@PARAM: @message = MENSAGEM.
@PARAM: @idMessage = ID DA MENSAGEM.
@PARAM: @isValid = true/false.
Ex de chamada Cpf inv�lido: sml_appendMessageField(this, "CPF inv�lido!", "spanCpfMessage", false);
Ex de chamada Cpf v�lido: sml_appendMessageField(this, "", "spanCpfMessage", true);
*/
function sml_appendMessageField(Obj, message, idMessage, isValid) {
    if ($(Obj).val() === "") {
        $(Obj).css("border", "");
        $("#" + idMessage).remove();
    } else {
        if (isValid) {
            $("#" + idMessage).remove();
            $(Obj).css("border", "1px solid green");
        } else {
            $("#" + idMessage).remove();
            $(Obj).css("border", "1px solid red");
            $(Obj).parent().append("<span id='" + idMessage + "' style='color:red;'><b>" + message + "</b></span>");
        }
    }
}

/*
Valida o CPF digitado utilizando a fun��o "sml_appendMessageField" para apresentar uma mensagem ao lado do campo se o CPF � v�lido ou n�o.
@PARAM: @Objcpf = OBJ DO CAMPO CPF.
Ex de chamada: onchange="sml_checkCPF(this);"
*/
function sml_checkCPF(Objcpf) {
    var cpf = Objcpf.value;

    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') {
        sml_appendMessageField(Objcpf, "CPF inv�lido!", "spanCpfMessage", false);
        $(Objcpf).val('');
    }
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999") {
        sml_appendMessageField(Objcpf, "CPF inv�lido!", "spanCpfMessage", false);
        $(Objcpf).val('');
    } else {

        // Valida 1o digito 
        add = 0;
        for (i = 0; i < 9; i++) {
            add += parseInt(cpf.charAt(i)) * (10 - i);
        }

        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) {
            sml_appendMessageField(Objcpf, "CPF inv�lido!", "spanCpfMessage", false);
            $(Objcpf).val('');
        } else {

            // Valida 2o digito 
            add = 0;
            for (i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i)) * (11 - i);
            }

            rev = 11 - (add % 11);
            if (rev === 10 || rev === 11)
                rev = 0;
            if (rev !== parseInt(cpf.charAt(10))) {
                sml_appendMessageField(Objcpf, "CPF inv�lido!", "spanCpfMessage", false);
                $(Objcpf).val('');
            } else {
                sml_appendMessageField(Objcpf, "", "spanCpfMessage", true);
            }
        }
    }
}

/*
Valida o CNPJ digitado utilizando a fun��o "sml_appendMessageField" para apresentar uma mensagem ao lado do campo se o CNPJ � v�lido ou n�o.
@PARAM: @Obj = OBJ DO CAMPO.
Ex de chamada: onchange="sml_checkCNPJ(this);"
*/
function sml_checkCNPJ(Obj) {

    cnpj = Obj.value.replace(/\./gi, "").replace(/\//gi, "").replace(/-/gi, "");
    console.log(cnpj);

    if (!cnpj || cnpj.length != 14
        || cnpj == "00000000000000"
        || cnpj == "11111111111111"
        || cnpj == "22222222222222"
        || cnpj == "33333333333333"
        || cnpj == "44444444444444"
        || cnpj == "55555555555555"
        || cnpj == "66666666666666"
        || cnpj == "77777777777777"
        || cnpj == "88888888888888"
        || cnpj == "99999999999999") {
        sml_appendMessageField(Obj, "CNPJ inv�lido!", "spanCnpjMessage", false);
        $(Obj).val('');
        return false;
    }

    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0)) {
        sml_appendMessageField(Obj, "CNPJ inv�lido!", "spanCnpjMessage", false);
        $(Obj).val('');
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1)) {
        sml_appendMessageField(Obj, "CNPJ inv�lido!", "spanCnpjMessage", false);
        $(Obj).val('');
        return false;
    } else {
        sml_appendMessageField(Obj, "", "spanCnpjMessage", true);
        return true;
    }

}

/*
Formata a data recebida em dateString pt-BR.
@PARAM: @strDate = Data.
@PARAM: @str = Caracter separador da data, ex: "/" ou "-".
Ex de chamada: sml_makeDate('2020.12.05', '.');
Resultado: 05/12/2020
 */
function sml_makeDate(strDate, str) {
    var pieces = strDate.split(str);
    var newDate = pieces[2] + "/" + pieces[1] + "/" + pieces[0];
    return newDate;
}

/*
Adiciona ou remove obrigatoriedade no campo.
@PARAM: @fieldId = Identificador.
@PARAM: @isRequired = true or false.
Ex de chamada para obrigar: sml_IsRequired('identificadorDoCampo', true);
Ex de chamada para desobrigar: sml_IsRequired('identificadorDoCampo', false);
*/
function sml_IsRequired(fieldId, isRequired) {
    var obj = $("inp:" + fieldId);

    if (isRequired) {
        obj[0].setAttribute('required', 'S');
        obj.closest('tr').attr('class', 'Obrigatorio');
    } else {
        obj[0].setAttribute('required', 'N');
        obj.closest('tr').attr('class', '');
    }
}

/*
Fun��o respons�vel por esconder/mostrar op��es de uma caixa de sele��o localizado ou n�o em uma tabela multi-valorada.
@PARAM: @selectId = Identificador da Caixa de sele��o.
@PARAM: @selectValues = Op��es da caixa de sele��o.
@PARAM: @op = opera��o. Valores: SHOW ou HIDE.
@PARAM: @hasMultiple = Se a caixa de sele��o estiver dentro de uma tabela multi-valorada. Valores do par�metro: true ou false.
@PARAM: @tableId = identificador da tabela multi-valorada.
Ex de chamada com tabela multi-valorada: sml_ShowOrHideSelectOptions("identificador", "Op��o 1, Op��o 2, Op��o 5", "HIDE", true, "tblAlteracoesNoDocumento");
Ex de chamada com tabela multi-valorada: sml_ShowOrHideSelectOptions("identificador", "Op��o 1, Op��o 2, Op��o 5", "SHOW", true, "tblAlteracoesNoDocumento");
Ex de chamada sem tabela multi-valorada: sml_ShowOrHideSelectOptions("identificador", "Op��o 1, Op��o 2, Op��o 5", "HIDE", false, "");
Ex de chamada sem tabela multi-valorada: sml_ShowOrHideSelectOptions("identificador", "Op��o 1, Op��o 2, Op��o 5", "SHOW", false, "");
 */
function sml_ShowOrHideSelectOptions(selectId, selectValues, op, hasMultiple, tableId) {

    if (hasMultiple) {

        $("#" + tableId).find("select[xname=inp" + selectId + "]").each(function () {
            var line = $(this).closest('tr').index() - 1;

            if (selectValues.indexOf(",") >= 0) {
                var arrayValues = selectValues.split(',');

                for (var i = 0; i < arrayValues.length; i++) {
                    var opcao = arrayValues[i];

                    if (op.toUpperCase() === "HIDE")
                        $('select[xname="inp' + selectId + '"] option[value="' + opcao + '"]').eq(line).hide().attr("disabled", true);
                    else
                        $('select[xname="inp' + selectId + '"] option[value="' + opcao + '"]').eq(line).show().attr("disabled", false);

                }

            } else {

                if (op.toUpperCase() === "HIDE")
                    $('select[xname="inp' + selectId + '"] option[value="' + selectValues + '"]').eq(line).hide().attr("disabled", true);
                else
                    $('select[xname="inp' + selectId + '"] option[value="' + selectValues + '"]').eq(line).show().attr("disabled", false);

            }

        });

    } else {

        if (selectValues.indexOf(",") >= 0) {
            var arrayValues = selectValues.split(',');

            for (var i = 0; i < arrayValues.length; i++) {
                var opcao = arrayValues[i];

                if (op.toUpperCase() === "HIDE")
                    $('select[xname="inp' + selectId + '"] option[value="' + opcao + '"]').hide().attr("disabled", true);
                else
                    $('select[xname="inp' + selectId + '"] option[value="' + opcao + '"]').show().attr("disabled", false);

            }

        } else {

            if (op.toUpperCase() === "HIDE")
                $('select[xname="inp' + selectId + '"] option[value="' + selectValues + '"]').hide().attr("disabled", true);
            else
                $('select[xname="inp' + selectId + '"] option[value="' + selectValues + '"]').show().attr("disabled", false);

        }

    }

}

/*
 Fun��o respons�vel por formatar o campo em telefone.
 @PARAM: @$obj = objeto.
 Ex de chamada: onkeyup="$(this).val(sml_PhoneMask($(this)));"
 Ex de chamada: onblur="$(this).val(sml_PhoneMask($(this)));"
 Ex de chamada: onchange="$(this).val(sml_PhoneMask($(this)));"
*/
function sml_PhoneMask($obj) {

    var phoneNumber = $obj.val().replace(/[^\d]+/g, '');    //Somente Numeros.
    var ddd;
    var firstPhoneDigits;
    var lastPhoneDigits;

    if (phoneNumber !== "" && phoneNumber !== null && phoneNumber !== undefined) {
        //Celular
        if (phoneNumber.length > 10) {

            ddd = phoneNumber.substr(0, 2);                 //Pega os 2 primeiros d�gitos
            firstPhoneDigits = phoneNumber.substr(2, 5);    //Pega os 5 primeiros d�gitos ap�s o ddd
            lastPhoneDigits = phoneNumber.substr(-4);       //Pega os 4 �ltimos d�gitos
            phoneNumber = "(" + ddd + ") " + firstPhoneDigits + "-" + lastPhoneDigits;
        //Fixo
        } else if (phoneNumber.length === 10) {

            ddd = phoneNumber.substr(0, 2);                 //Pega os 2 primeiros d�gitos
            firstPhoneDigits = phoneNumber.substr(2, 4);    //Pega os 4 primeiros d�gitos ap�s o ddd
            lastPhoneDigits = phoneNumber.substr(-4);       //Pega os 4 �ltimos d�gitos
            phoneNumber = "(" + ddd + ") " + firstPhoneDigits + "-" + lastPhoneDigits;

        }
        return phoneNumber;
    }

}

/*
EXEMPLO DE FUN��O PARA CONTROLAR TABELA MULTI-VALORADA AO INSERIR OU REMOVER LINHAS
Ao adicionar/remover uma linha na tabela multi-valorada, adiciona fun��o de controle nos bot�es.
@PARAM: @$tbl = Objeto tabela.
Ex de chamada: sml_addFunctionOnInsertAndDeleteTableValue($("table[id='tblRepresentantesLegais']"));
*/
function sml_addFunctionOnInsertAndDeleteTableValue($tbl) {
    //n�mero de linhas permitidas
    //EX: numberLinesAllowed = 0; = 1 linha permitida.
    //EX: numberLinesAllowed = 1; = 2 linhas permitidas.
    //EX: numberLinesAllowed = 2; = 3 linhas permitidas.
    //EX: numberLinesAllowed = 3; = 4 linhas permitidas.
    var numberLinesAllowed = 3;

    $tbl.find("#BtnInsertNewRow").prop('onclick', null).off('click');
    $tbl.find("#BtnInsertNewRow").on("click", function () {
        InsertNewRow($(this)[0], true);
        sml_CheckTableLines($tbl);
        sml_DeleteTableLine($tbl);
    });

    /*
     Ap�s inserir a linha da tabela multi-valorada verifica a quantidade de linhas adicionadas e faz as regras.
     @PARAM: @$tbl = Objeto tabela.
    */
    function sml_CheckTableLines($tbl) {
        if ($tbl !== "" && $tbl !== undefined && $tbl !== null) {
            var tableLines = $tbl.find("tr").length - 1;

            if (tableLines > numberLinesAllowed)
                $tbl.find("#BtnInsertNewRow").hide();
            else
                $tbl.find("#BtnInsertNewRow").show();
        }
    }
    /*
    Para cada bot�o de Excluir linha da tabela, adiciona a fun��o de verificar a quantidade de linhas.
    @PARAM: @$tbl = Objeto tabela.
    */
    function sml_DeleteTableLine($tbl) {
        $(".btn-delete-mv").each(function () {
            $(this).prop('onclick', null).off('click');

            $(this).on("click", function () {
                var tr = $(this).closest("tr");

                if ($tbl.find("tr").length > 2) {
                    tr.remove();
                } else {
                    alert("N�o � poss�vel excluir esta linha.");
                }

                sml_CheckTableLines($tbl);
            });
        });
    }

}

/*
EXEMPLO DE FUN��O AJAX CONSUMINDO UMA FONTE DE DADOS
Fun��o respons�vel por verificar se o cpf possui inst�ncia aberta.
@PARAM: @cpf = CPF.
Ex de chamada: sml_getUserInstanceByCpf('111.111.111-11');
*/
function sml_getUserInstanceByCpf(cpf) {

    if (cpf !== null && cpf !== undefined && cpf !== "") {
        $.ajax({
            type: "POST",
            url: "https://{url}?inppessoaFisicaCpf=" + cpf,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (function Success(data, status) {
                if (data.success !== null && data.success !== undefined && data.success.length > 0) {

                    $("inp:instancia").val(data.success[0].fields.instancia);
                    $("inp:statusInstancia").val(data.success[0].fields.statusInstancia);

                    if ($("inp:statusInstancia").val().toUpperCase() === "EM ANDAMENTO" || $("inp:statusInstancia").val().toUpperCase() === "ASSINADO") {
                        alert("Aten��o! Voc� j� possui uma proposta em an�lise de C�digo: " + $("inp:instancia").val() + ". Ao finalizar essa proposta, a anterior sera desconsiderada!");
                    }

                }

            }),
            error: (function Error(request, status, error) {
                var errorMessage = "Ocorreu um erro ao pesquisar o nome do usu�rio! </br> " + status + ". " + request;
                alert(errorMessage);
            })
        });
    }

}

//+ Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]
/*
DESENVOLVEDOR:  Igor Becker
Trasforma o n�mero digitado em texto por extenso.
Exemplo: $("inp:exemplo").blur($("inp:campoDestino").val($(this).val().extenso(true)));
@PARAM: @c = valor monet�rio ? true or false.
*/
String.prototype.extenso = function (c) {
    var ex = [
        ["zero", "um", "dois", "tr�s", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
        ["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
        ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
        ["mil", "milh�o", "bilh�o", "trilh�o", "quadrilh�o", "quintilh�o", "sextilh�o", "setilh�o", "octilh�o", "nonilh�o", "decilh�o", "undecilh�o", "dodecilh�o", "tredecilh�o", "quatrodecilh�o", "quindecilh�o", "sedecilh�o", "septendecilh�o", "octencilh�o", "nonencilh�o"]
    ];
    var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
    for (var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []) {
        j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
        if (!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
        for (a = -1, l = v.length; ++a < l; t = "") {
            if (!(i = v[a] * 1)) continue;
            i % 100 < 20 && (t += ex[0][i % 100]) ||
                i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
            s.push((i < 100 ? t : !(i % 100) ? ex[2][i === 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
                ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("�o", "�es") : ex[3][t]) : ""));
        }
        a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
        a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
    }
    return r.join(e);
}

