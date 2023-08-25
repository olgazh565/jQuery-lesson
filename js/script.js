'use strict';

const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');
const modalOverlay = $('.modal-order');
const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');
const burgerMenu = $('.navigation');

modalBtn.on('click', () => {
    modalOverlay.show(500);
});

modalClose.on('click', () => {
    modalOverlay.hide(500);
});

modalOrderInput.focus(function() {
    modalOrderTitle
        .text(`Введите ${$(this).attr('placeholder').toLowerCase()}`);
});

modalOrderInput.blur(function() {
    modalOrderTitle.text('Заполните форму');
});

const foo = function() {
    $(this).fadeTo(1000, 0.5).animate({height: '100px'}, 2000, function() {
        alert('Анимация закончилась');
    });    
};

$('.what-building__item').on('click', foo);

// сетевой запрос методом post()

// $('.modal-order__form').submit(function(e) {
//     e.preventDefault();
//     $.post('http://jsonplaceholder.typicode.com/todos', $(this).serialize())
//         .then(function(data) {
//             console.log(data);
//         })
//         .catch(function(err) {
//             console.log(err.status);
//         });
// });

// сетевой запрос методом ajax()

$('.modal-order__form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'http://jsonplaceholder.typicode.com/todos',
        type: 'POST',
        data: $(this).serialize(),
        success: function(data) {
            modalOrderTitle.text('Спасибо, заявка принята, номер заявки ' + data.id);
            $('.modal-order__form').slideUp(300);
        },
        error() {
            modalOrderTitle.text('Что-то пошло не так, опробуйте позже!');
        },
    });
});

// открыть бургер

$('.header__burger').on('click', function() {
    burgerMenu.animate({
        left: 0,        
    }, 500, function() {
        $('.navigation__close').animate({
            opacity: 1,
        }, 300, 'swing');
    });
});

// закрыть бургер

$('.navigation__close').on('click', function() {
    burgerMenu.animate({
        left: '-400px',
    }, 300);
});

// закрыть бургер при клике мимо бургера

$(document).on('click', function (e) {
    if (burgerMenu.css('left') === '0px') {
        if ($(e.target).closest('.navigation').length) return;
        
        burgerMenu.animate({
            left: '-400px',
        }, 300);
    }    
});