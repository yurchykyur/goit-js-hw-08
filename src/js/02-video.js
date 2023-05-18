// Завдання 2 - відеоплеєр
// HTML містить <iframe> з відео для Vimeo плеєра. Напиши скрипт,
// який буде зберігати поточний час відтворення відео у локальне сховище і,
// після перезавантаження сторінки, продовжувати відтворювати відео з цього часу.

// Виконуй це завдання у файлах 02-video.html і 02-video.js. Розбий його на декілька підзавдань:

// Ознайомся з документацією бібліотеки Vimeo плеєра. https://github.com/vimeo/player.js/#vimeo-player-api
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй,
// що у тебе плеєр доданий як npm пакет, а не через CDN.
// Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
// Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

/**
 * a function that keeps track of the player's time and calls the "writeCurrentTimeVideo" function with a delay
 */
player.on('timeupdate', throttle(writeCurrentTimeVideo, 1000));

/**
 * function that gets the current video playback time and writes its local storage to a variable 'videoplayer-current-time'
 */
function writeCurrentTimeVideo() {
  player.getCurrentTime().then(function (seconds) {
    localStorage.setItem('videoplayer-current-time', String(seconds));
  });
}

/**
 * a function that transmits to the video player the time value for starting playback from the local storage
 * where the video preview stopped
 */
window.onload = function () {
  player.setCurrentTime(
    Number(localStorage.getItem('videoplayer-current-time'))
  );
};
