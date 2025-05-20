
let score = 100;
let addCorrect = 0;
let subCorrect = 0;
const totalQuestions = 5;
const dez1 = document.getElementById("dez1");
const uni1 = document.getElementById("uni1");
const dez2 = document.getElementById("dez2");
const uni2 = document.getElementById("uni2");
const sdez = document.getElementById("sdez");
const suni = document.getElementById("suni");
const addResult = document.getElementById("addResult");
let a = 0;
let b = 0;
let c = 0;
let d = 0;
const psub1 = document.getElementById("psub1");
const sdsub2 = document.getElementById("sdsub2");
const susub2 = document.getElementById("susub2");
const rsdsub2 = document.getElementById("rsdsub2");
const rsusub2 = document.getElementById("rsusub2");
const subResult = document.getElementById("subResult");
function generateAddition() {

    do {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
    } while (a + b > 100);
    document.getElementById("add1").value = a;
    document.getElementById("add1").style.backgroundColor = "cornflowerblue";
    document.getElementById("add2").value = b;
    document.getElementById("add2").style.backgroundColor = "darkgoldenrod";
    uni1.setAttribute('disabled', 'true');
    dez2.setAttribute('disabled', 'true');
    uni2.setAttribute('disabled', 'true');
    sdez.setAttribute('disabled', 'true');
    suni.setAttribute('disabled', 'true');
    addResult.setAttribute('disabled', 'true');
}
///////Validation additional fields
//Primeira dezena field
dez1.addEventListener('input', function () {
    if (dez1.value == Math.floor(a / 10) * 10) {
        dez1.style.backgroundColor = "green";
        uni1.removeAttribute('disabled');
    } else {
        dez1.style.backgroundColor = "red";
        uni1.setAttribute('disabled', 'true');
    }
});
//Primeira unidade field
uni1.addEventListener('input', function () {
    if (uni1.value == a % 10) {
        uni1.style.backgroundColor = "green";
        dez2.removeAttribute('disabled');
    } else {
        uni1.style.backgroundColor = "red";
        dez2.setAttribute('disabled', 'true');
    }
});
//Segunda dezena field
dez2.addEventListener('input', function () {
    if (dez2.value == Math.floor(b / 10) * 10) {
        dez2.style.backgroundColor = "green";
        uni2.removeAttribute('disabled');
    } else {
        dez2.style.backgroundColor = "red";
        uni2.setAttribute('disabled', 'true');
    }
});
//Segunda unidade field
uni2.addEventListener('input', function () {
    if (uni2.value == b % 10) {
        uni2.style.backgroundColor = "green";
        sdez.removeAttribute('disabled');
    } else {
        uni2.style.backgroundColor = "red";
        sdez.setAttribute('disabled', 'true');
    }
});
//Soma das dezenas field
sdez.addEventListener('input', function () {
    if (sdez.value == (parseInt(dez1.value) + parseInt(dez2.value))) {
        sdez.style.backgroundColor = "green";
        suni.removeAttribute('disabled');
    } else {
        sdez.style.backgroundColor = "red";
        suni.setAttribute('disabled', 'true');
    }
});

//Soma da unidades field
suni.addEventListener('input', function () {
    if (suni.value == (parseInt(uni1.value) + parseInt(uni2.value))) {
        suni.style.backgroundColor = "green";
        addResult.removeAttribute('disabled');
    } else {
        suni.style.backgroundColor = "red";
        addResult.setAttribute('disabled', 'true');
    }
});

//Validation subtraction fields
function generateSubtraction() {
    c = Math.floor(Math.random() * 90) + 10;
    d = Math.floor(Math.random() * 90) + 10;
    if (c < d) [c, d] = [d, c];
    document.getElementById("sub1").value = c;
    document.getElementById("sub2").value = d;
    sdsub2.setAttribute('disabled', 'true');
    susub2.setAttribute('disabled', 'true');
    rsdsub2.setAttribute('disabled', 'true');
    rsusub2.setAttribute('disabled', 'true');
    subResult.setAttribute('disabled', 'true');

}
//primeiro campo subtração
psub1.addEventListener('input', function () {
    if (psub1.value == c) {
        psub1.style.backgroundColor = "green";
        sdsub2.removeAttribute('disabled');
    } else {
        psub1.style.backgroundColor = "red";
        sdsub2.setAttribute('disabled', 'true');
    }
});
//dezena segundo campo subtração
sdsub2.addEventListener('input', function () {
    if (sdsub2.value == Math.floor(d / 10) * 10) {
        sdsub2.style.backgroundColor = "green";
        susub2.removeAttribute('disabled');
    } else {
        sdsub2.style.backgroundColor = "red";
        susub2.setAttribute('disabled', 'true');
    }
});

//unidade segundo campo subtração
susub2.addEventListener('input', function () {
    if (susub2.value == d % 10) {
        susub2.style.backgroundColor = "green";
        rsdsub2.removeAttribute('disabled');
    } else {
        susub2.style.backgroundColor = "red";
        rsdsub2.setAttribute('disabled', 'true');
    }
});
//resultado priemiro numero menos dezena
rsdsub2.addEventListener('input', function () {
    if (rsdsub2.value == c - Math.floor(d / 10) * 10) {
        rsdsub2.style.backgroundColor = "green";
        rsusub2.removeAttribute('disabled');
    } else {
        rsdsub2.style.backgroundColor = "red";
        rsusub2.setAttribute('disabled', 'true');
    }
});
//resultado unidade menos unidade
rsusub2.addEventListener('input', function () {
    if (rsusub2.value == d % 10) {
        rsusub2.style.backgroundColor = "green";
        subResult.removeAttribute('disabled');
    } else {
        rsusub2.style.backgroundColor = "red";
        subResult.setAttribute('disabled', 'true');
    }
});

function checkIfCompleted() {

    if (addCorrect >= totalQuestions) {
        document.getElementById("message").innerHTML =
            `<strong>🎉 Desafio de somar concluído com sucesso!</strong>`;
        document.getElementById("validateAdd").disabled = true;
        dez1.setAttribute('disabled', 'true');
        uni1.setAttribute('disabled', 'true');
        dez2.setAttribute('disabled', 'true');
        uni2.setAttribute('disabled', 'true');
        sdez.setAttribute('disabled', 'true');
        suni.setAttribute('disabled', 'true');
        addResult.setAttribute('disabled', 'true');
        validateAdd.setAttribute('disabled', 'true');
    }
    if (subCorrect >= totalQuestions) {
        document.getElementById("sMessage").innerHTML =
            `<strong>🎉 Desafio de subtração concluído com sucesso!</strong>`;
        document.getElementById("validateSub").disabled = true;
        psub1.setAttribute('disabled', 'true');
        sdsub2.setAttribute('disabled', 'true');
        susub2.setAttribute('disabled', 'true');
        rsdsub2.setAttribute('disabled', 'true');
        rsusub2.setAttribute('disabled', 'true');
        subResult.setAttribute('disabled', 'true');
        validateSub.setAttribute('disabled', 'true');
    }
    if (addCorrect >= totalQuestions && subCorrect >= totalQuestions) {
        document.getElementById("subMessage").innerHTML =
            `<strong>🎉 Desafio concluído com sucesso!</strong><br>Pontuação final: ${score}/100`;
        document.getElementById("restartBtn").style.display = "inline";
    }
}

//Validation for addition
document.getElementById("validateAdd").onclick = function () {
    const a = parseInt(document.getElementById("add1").value);
    const b = parseInt(document.getElementById("add2").value);
    const userResult = parseInt(document.getElementById("addResult").value);

    if (a + b === userResult) {
        addCorrect++;
        document.getElementById("message").innerText = `✅ Correto! Faltam ${totalQuestions - addCorrect} de soma.`;
        document.getElementById("addResult").value = "";
        document.getElementById("dez1").value = "";
        document.getElementById("dez1").style.backgroundColor = "";
        document.getElementById("uni1").value = "";
        document.getElementById("uni1").style.backgroundColor = "";
        document.getElementById("dez2").value = "";
        document.getElementById("dez2").style.backgroundColor = "";
        document.getElementById("uni2").value = "";
        document.getElementById("uni2").style.backgroundColor = "";
        document.getElementById("sdez").value = "";
        document.getElementById("sdez").style.backgroundColor = "";
        document.getElementById("suni").value = "";
        document.getElementById("suni").style.backgroundColor = "";

        if (addCorrect < totalQuestions) generateAddition();
    } else {
        score = Math.max(score - 5, 0);
        document.getElementById("message").innerText = "❌ Incorreto! Tente novamente.";
    }
    checkIfCompleted();
};

//Validation for subtraction
document.getElementById("validateSub").onclick = function () {
    const a = parseInt(document.getElementById("sub1").value);
    const b = parseInt(document.getElementById("sub2").value);
    const userResult = parseInt(document.getElementById("subResult").value);

    if (a - b === userResult) {
        subCorrect++;
        document.getElementById("sMessage").innerText = `✅ Correto! Faltam ${totalQuestions - subCorrect} de subtração.`;
        document.getElementById("subResult").value = "";
        document.getElementById("psub1").value = "";
        document.getElementById("psub1").style.backgroundColor = "";
        document.getElementById("sdsub2").value = "";
        document.getElementById("sdsub2").style.backgroundColor = "";
        document.getElementById("susub2").value = "";
        document.getElementById("susub2").style.backgroundColor = "";
        document.getElementById("rsdsub2").value = "";
        document.getElementById("rsdsub2").style.backgroundColor = "";
        document.getElementById("susub2").value = "";
        document.getElementById("susub2").style.backgroundColor = "";
        document.getElementById("rsusub2").value = "";
        document.getElementById("rsusub2").style.backgroundColor = "";


        if (subCorrect < totalQuestions) generateSubtraction();
    } else {
        score = Math.max(score - 5, 0);
        document.getElementById("sMessage").innerText = "❌ Incorreto! Tente novamente.";
    }
    checkIfCompleted();
};

//Button to restart the game
//Restart the game
document.getElementById("restartBtn").onclick = function () {
    score = 100;
    addCorrect = 0;
    subCorrect = 0;

    document.getElementById("validateAdd").disabled = false;
    document.getElementById("validateSub").disabled = false;
    document.getElementById("restartBtn").style.display = "none";

    generateAddition();
    generateSubtraction();
};

//Button to show the answer
window.onload = function () {
    // Inicializar com os primeiros desafios
    generateAddition();
    generateSubtraction();
    document.getElementById("subMessage").textContent = "🧠 Resolva 5 contas";
}


