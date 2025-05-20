class ArithmeticChallenge {
    constructor() {
        this.score = 100;
        this.totalQuestions = 5;
        this.addCorrect = 0;
        this.subCorrect = 0;
        this.mode = 0;

        this.cacheElements();
        this.bindEvents();
        this.init();
    }

    cacheElements() {
        this.fields = {
            dez1: document.getElementById("dez1"),
            uni1: document.getElementById("uni1"),
            dez2: document.getElementById("dez2"),
            uni2: document.getElementById("uni2"),
            sdez: document.getElementById("sdez"),
            suni: document.getElementById("suni"),
            addResult: document.getElementById("addResult"),
            psub1: document.getElementById("psub1"),
            sdsub2: document.getElementById("sdsub2"),
            susub2: document.getElementById("susub2"),
            rsdsub2: document.getElementById("rsdsub2"),
            rsusub2: document.getElementById("rsusub2"),
            subResult: document.getElementById("subResult")
        };

        this.buttons = {
            validateAdd: document.getElementById("validateAdd"),
            validateSub: document.getElementById("validateSub"),
            restartBtn: document.getElementById("restartBtn"),
            easyBtn: document.getElementById("easyBtn"),
            hardBtn: document.getElementById("hardBtn")
        };

        this.messages = {
            message: document.getElementById("message"),
            sMessage: document.getElementById("sMessage"),
            subMessage: document.getElementById("subMessage")
        };
    }

    bindEvents() {
        this.buttons.validateAdd.onclick = this.validateAddition.bind(this);
        this.buttons.validateSub.onclick = this.validateSubtraction.bind(this);
        this.buttons.restartBtn.onclick = this.restart.bind(this);
        this.buttons.easyBtn.onclick = this.setEasyMode.bind(this);
        this.buttons.hardBtn.onclick = this.setHardMode.bind(this);

        this.fields.dez1.addEventListener('input', () => this.validateInput(this.fields.dez1, Math.floor(this.a / 10) * 10, this.fields.uni1));
        this.fields.uni1.addEventListener('input', () => this.validateInput(this.fields.uni1, this.a % 10, this.fields.dez2));
        this.fields.dez2.addEventListener('input', () => this.validateInput(this.fields.dez2, Math.floor(this.b / 10) * 10, this.fields.uni2));
        this.fields.uni2.addEventListener('input', () => this.validateInput(this.fields.uni2, this.b % 10, this.fields.sdez));
        this.fields.sdez.addEventListener('input', () => this.validateInput(this.fields.sdez, parseInt(this.fields.dez1.value) + parseInt(this.fields.dez2.value), this.fields.suni));
        this.fields.suni.addEventListener('input', () => this.validateInput(this.fields.suni, parseInt(this.fields.uni1.value) + parseInt(this.fields.uni2.value), this.fields.addResult, this.buttons.validateAdd));

        this.fields.psub1.addEventListener('input', () => this.validateInput(this.fields.psub1, this.c, this.fields.sdsub2));
        this.fields.sdsub2.addEventListener('input', () => this.validateInput(this.fields.sdsub2, Math.floor(this.d / 10) * 10, this.fields.susub2));
        this.fields.susub2.addEventListener('input', () => this.validateInput(this.fields.susub2, this.d % 10, this.fields.rsdsub2));
        this.fields.rsdsub2.addEventListener('input', () => this.validateInput(this.fields.rsdsub2, this.c - Math.floor(this.d / 10) * 10, this.fields.rsusub2));
        this.fields.rsusub2.addEventListener('input', () => this.validateInput(this.fields.rsusub2, this.d % 10, this.fields.subResult, this.buttons.validateSub));
    }

    init() {
        this.generateAddition();
        this.generateSubtraction();
        this.messages.subMessage.textContent = "🧠 Resolva 5 contas de cada tipo";
        this.buttons.restartBtn.style.display = "none";
        this.buttons.validateAdd.disabled = true;
        this.buttons.validateSub.disabled = true;
        this.fields.dez1.setAttribute('disabled', 'true');
        this.fields.psub1.setAttribute('disabled', 'true');
    }

    generateAddition() {
        do {
            this.a = Math.floor(Math.random() * 90) + 10;
            this.b = Math.floor(Math.random() * 90) + 10;
        } while (this.a + this.b > 100);

        document.getElementById("add1").value = this.a;
        document.getElementById("add2").value = this.b;

        this.disableFields(["uni1", "dez2", "uni2", "sdez", "suni", "addResult"]);
        this.setColor(["add1", "add2"], ["cornflowerblue", "darkgoldenrod"]);
    }

    generateSubtraction() {
        this.c = Math.floor(Math.random() * 90) + 10;
        this.d = Math.floor(Math.random() * 90) + 10;
        if (this.c < this.d) [this.c, this.d] = [this.d, this.c];

        document.getElementById("sub1").value = this.c;
        document.getElementById("sub2").value = this.d;

        this.disableFields(["sdsub2", "susub2", "rsdsub2", "rsusub2", "subResult"]);
    }

    validateInput(field, correctValue, nextField, enableBtn) {
        const isValid = parseInt(field.value) === correctValue;
        if (this.mode === 1) field.style.backgroundColor = isValid ? "green" : "red";

        if (isValid) {
            nextField?.removeAttribute('disabled');
            nextField?.focus();
            if (enableBtn) enableBtn.disabled = false;
        } else {
            nextField?.setAttribute('disabled', 'true');
        }
    }

    validateAddition() {
        const userResult = parseInt(this.fields.addResult.value);
        if (this.a + this.b === userResult) {
            this.addCorrect++;
            this.messages.message.innerText = `✅ Correto! Faltam ${this.totalQuestions - this.addCorrect} de soma.`;
            this.clearFields(["dez1", "uni1", "dez2", "uni2", "sdez", "suni", "addResult"]);
            this.buttons.validateAdd.disabled = true;
            if (this.addCorrect < this.totalQuestions) this.generateAddition();
        } else {
            this.score = Math.max(this.score - 5, 0);
            this.messages.message.innerText = "❌ Incorreto! Tente novamente.";
        }
        this.checkCompletion();
    }

    validateSubtraction() {
        const userResult = parseInt(this.fields.subResult.value);
        if (this.c - this.d === userResult) {
            this.subCorrect++;
            this.messages.sMessage.innerText = `✅ Correto! Faltam ${this.totalQuestions - this.subCorrect} de subtração.`;
            this.clearFields(["psub1", "sdsub2", "susub2", "rsdsub2", "rsusub2", "subResult"]);
            this.buttons.validateSub.disabled = true;
            if (this.subCorrect < this.totalQuestions) this.generateSubtraction();
        } else {
            this.score = Math.max(this.score - 5, 0);
            this.messages.sMessage.innerText = "❌ Incorreto! Tente novamente.";
        }
        this.checkCompletion();
    }

    checkCompletion() {
        if (this.addCorrect >= this.totalQuestions) {
            this.messages.message.innerHTML = `<strong>🎉 Desafio de somar concluído com sucesso!</strong>`;
            this.disableFields(["dez1", "uni1", "dez2", "uni2", "sdez", "suni", "addResult"]);
        }
        if (this.subCorrect >= this.totalQuestions) {
            this.messages.sMessage.innerHTML = `<strong>🎉 Desafio de subtração concluído com sucesso!</strong>`;
            this.disableFields(["psub1", "sdsub2", "susub2", "rsdsub2", "rsusub2", "subResult"]);
        }
        if (this.addCorrect >= this.totalQuestions && this.subCorrect >= this.totalQuestions) {
            this.messages.subMessage.innerHTML = `<strong>🎉 Desafio concluído com sucesso!</strong><br>Pontuação final: ${this.score}/100`;
            this.buttons.restartBtn.style.display = "inline";
            this.messages.message.innerText = "";
            this.messages.sMessage.innerText = "";
        }
    }

    restart() {
        this.score = 100;
        this.addCorrect = 0;
        this.subCorrect = 0;
        this.messages.message.innerText = "";
        this.messages.sMessage.innerText = "";
        this.messages.subMessage.textContent = "🧠 Resolva 5 contas de cada tipo";
        this.buttons.easyBtn.style.display = "inline";
        this.buttons.hardBtn.style.display = "inline";
        this.buttons.restartBtn.style.display = "none";

        this.generateAddition();
        this.generateSubtraction();

        this.buttons.validateAdd.disabled = true;
        this.buttons.validateSub.disabled = true;
        this.fields.dez1.setAttribute('disabled', 'true');
        this.fields.psub1.setAttribute('disabled', 'true');
    }

    setEasyMode() {
        this.mode = 1;
        this.buttons.easyBtn.style.backgroundColor = "green";
        this.buttons.hardBtn.style.display = "none";
        this.fields.dez1.removeAttribute('disabled');
        this.fields.psub1.removeAttribute('disabled');
    }

    setHardMode() {
        this.mode = 2;
        this.buttons.hardBtn.style.backgroundColor = "green";
        this.buttons.easyBtn.style.display = "none";
        this.fields.dez1.removeAttribute('disabled');
        this.fields.psub1.removeAttribute('disabled');
    }

    disableFields(ids) {
        ids.forEach(id => document.getElementById(id).setAttribute('disabled', 'true'));
    }

    clearFields(ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            el.value = "";
            el.style.backgroundColor = "";
        });
    }

    setColor(ids, colors) {
        ids.forEach((id, index) => {
            document.getElementById(id).style.backgroundColor = colors[index];
        });
    }
}

window.onload = () => new ArithmeticChallenge();
