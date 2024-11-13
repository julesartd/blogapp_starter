const body = document.querySelector('body');
let calc;
let modal;
let confirmBtn;
let cancelBtn;

export function openModal(question) {
    createCalc();
    createModal(question);

    body.append(calc);
    calc.append(modal);

    return new Promise((resolve) => {
        calc.addEventListener('click', () => {
            resolve(false);
            calc.remove();
        });
        cancelBtn.addEventListener('click', () => {
            resolve(false);
            calc.remove();
        });

        confirmBtn.addEventListener('click', () => {
            resolve(true);
            calc.remove();
        });
    });
}

const createCalc = () => {
    calc = document.createElement('div');
    calc.classList.add('calc');
}

const createModal = (question) => {
    modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
            <p>${question}</p>
    `;

    cancelBtn = document.createElement('button');
    cancelBtn.classList.add('btn', 'btn-secondary');
    cancelBtn.innerText = 'Annuler';

    confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn', 'btn-danger');
    confirmBtn.innerText = 'Confirmer';

    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    modal.append(cancelBtn, confirmBtn);

}