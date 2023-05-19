// Завдання 3 - форма зворотного зв'язку
// HTML містить розмітку форми. Напиши скрипт, який буде зберігати значення полів у локальне сховище,
// коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// ++ Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message,
// ++ у яких зберігай поточні значення полів форми.Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми.
// В іншому випадку поля повинні бути порожніми.
// ++ Під час сабміту форми очищуй сховище і поля форми,
// ++ а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд.
// ++ Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input[name="email"]'),
  textarea: document.querySelector('textarea[name="message"]'),
};

const dataFeedbackForm = {
  email: '1',
  message: '1',
};

refs.form.addEventListener('submit', onSubmitForm);
refs.input.addEventListener('input', onInputEmail);
refs.textarea.addEventListener('input', throttle(onInputMessage, 500));

/**
 * follows the input 'email' data and calls the local storage data write function
 * @param {input} e , event
 */
function onInputEmail(e) {
  console.log(e.currentTarget.value);
  dataFeedbackForm.email = e.currentTarget.value;
  saveDataFormInLOcalStorage(FEEDBACK_FORM_STATE, dataFeedbackForm);
}

/**
 * follows the input 'message' data and calls the local storage data write function
 * @param {input} e , event
 */
function onInputMessage(e) {
  console.log(e.currentTarget.value);
  dataFeedbackForm.message = e.currentTarget.value;
  saveDataFormInLOcalStorage(FEEDBACK_FORM_STATE, dataFeedbackForm);
}

/**
 * function that clears the form and local storage when the form is submitted
 * @param {submit} e event
 */
function onSubmitForm(e) {
  e.preventDefault();
  console.log(getDataFromLocalStorage(FEEDBACK_FORM_STATE));
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  refs.form.reset();
}

/**
 * the function that writes the data entered in the form to the local storage, checks the data being written for errors
 * @param {String} key
 * @param {Object} value
 */
function saveDataFormInLOcalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

/**
 * checks whether the page has been reloaded and calls the function to check for the presence of data
 * in the local storage corresponding to the FEEDBACK_FORM_STATE key.
 * If the data is available, the form fields are filled.
 */
window.onload = function () {
  console.log('i reload');

  if (getDataFromLocalStorage(FEEDBACK_FORM_STATE)) {
    console.log('we find data');
    const obj = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
    refs.input.value = obj.email;
    refs.textarea.value = obj.message;
  } else {
    console.log('we do not find data');
  }
};

/**
 * a function that checks the data written to the local storage
 * @param {String} key
 * @returns returns "undefined" or an object that is stored in storage
 */
function getDataFromLocalStorage(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
