//Получаем доступ к DOM элементам
let form = document.querySelector('.form');
let formBtn = form.querySelector('.btn');
let fields = form.querySelectorAll('.form-control');
let userName = form.querySelector('.userName');
let userPhone = form.querySelector('.phone');
let userEmail = form.querySelector('.email');
let modal = document.querySelector('.modal');
modal.style.background = 'rgba(0,0,0, 0.5)';
let modalBody = modal.querySelector('.modal-body')

function createModal() {//создаем модальное окно
    return modal.style.display = 'block';
};
function modalCloser() {//при закрытии модального окна удалаем ошибки
    let modalCloser = modal.querySelector('.btn-close');
    modalCloser.addEventListener('click', () => {
        let errors = modal.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove()
        }

        modal.style.display = 'none';
    })
};
function createErrors(content) {//создаем информацию об ошибках
    let error = document.createElement('p');
    error.className = 'error';
    modalBody.append(error);
    error.textContent = content;
};

//Запрет на ввод букв в поле Phone
let regex = /[A-Za-zА-Яа-яЁё ]/g;
userPhone.oninput = function () {
    userPhone.value = userPhone.value.replace(regex, '');
}

//Создаем форму и запрещаем ей перезагружать страницу
form.addEventListener('submit', function (event) {
    event.preventDefault()

    //получаем значения всех input in form
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) { //Проверка на заполненость полей
            createModal();
            modalCloser();

            //Проверка на незаполненые input
            for (let y = 0; y < !fields[i].value; y++) {
                let errorContent = 'Заполните поле ' + fields[i].name; //указываем действие и имя незаполненого input
                createErrors(errorContent);
            };

        };

    };

    //проверка на правильность ввода email-адресса
    if (userEmail.value && !userEmail.value.includes('@')) {
        createModal();
        modalCloser();
        let emailErrorContent = 'Поле Email должно содержать "@"';
        createErrors(emailErrorContent);
    };

    //при отстутвии ошибок, выполняем переход на страницу
    if (modalBody.children.length === 0) {
        setTimeout(function () {
            window.location.href = 'thanks.html';
        }, 5);

    }
});
