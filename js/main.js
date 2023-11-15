// Таймер
(function () {
    const openModalClass = "open";

    const modal = document.querySelector(".modal-overlay");

    // получаем элементы, содержащие компоненты даты
    const hoursTime = document.querySelector(".countdown__hours");
    const hoursText = document.querySelector(".countdown__text_hours");
    const minutesTime = document.querySelector(".countdown__minutes");
    const minutesText = document.querySelector(".countdown__text_minutes");
    const secondsTime = document.querySelector(".countdown__seconds");
    const secondsText = document.querySelector(".countdown__text_seconds");
    // конечная дата
    const deadline = new Date().setHours(23, 59, 59);

    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[
            num % 100 > 4 && num % 100 < 20
                ? 2
                : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
        ];
    }

    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = new Date(deadline) - new Date();

        if (diff <= 0) {
            clearInterval(timerId);
        }

        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

        hoursTime.textContent = hours < 10 ? "0" + hours : hours;
        minutesTime.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsTime.textContent = seconds < 10 ? "0" + seconds : seconds;
        hoursText.textContent = declensionNum(hours, ["час", "часа", "часов"]);
        minutesText.textContent = declensionNum(minutes, [
            "минута",
            "минуты",
            "минут",
        ]);
        secondsText.textContent = declensionNum(seconds, [
            "секунда",
            "секунды",
            "секунд",
        ]);
    }
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);

    function onDocumentMouseOut(evt) {
        if (!document.contains(evt.relatedTarget)) {
            modal.classList.add(openModalClass);
        }
    }

    function onOverlayClick(evt) {
        if (evt.target === modal) {
            modal.classList.remove(openModalClass);
        }
    }

    document.addEventListener("mouseout", onDocumentMouseOut);
    document.addEventListener("click", onOverlayClick);
})();

// Надоедливые сообщения
(function () {
    let currentMessage = undefined;
    const showClass = "show";
    const timerTime = 10000;
    const firstMessage = 0;
    let timer;
    let innerTimer;

    const modalMessages = Array.from(
        document.querySelectorAll(".modal-message")
    );

    function clearTimer() {
        clearTimeout(timer);
    }

    function clearInnerTimer() {
        clearTimeout(innerTimer);
    }

    function closeMessageModal() {
        modalMessages.forEach((message) => {
            const isShowMessage = message.classList.contains(showClass);

            if (isShowMessage) {
                message.classList.remove(showClass);
            }
        });
    }

    function onCloseBtnClick(evt) {
        evt.preventDefault();

        closeMessageModal();
        clearTimer();
        clearInnerTimer();
        startTimer();
    }

    modalMessages.forEach((message) => {
        const closeBtn = message.querySelector(".modal-message__close");

        closeBtn.addEventListener("click", onCloseBtnClick);
    });

    function showMessageModal() {
        if (currentMessage === modalMessages.length) {
            currentMessage = firstMessage;
        }

        if (currentMessage === undefined) {
            currentMessage = firstMessage;
        }

        modalMessages.forEach((message, i) => {
            if (i === currentMessage) {
                message.classList.add(showClass);
            }
        });

        currentMessage = currentMessage + 1;

        startInnerTimer();
    }

    function startTimer() {
        timer = setTimeout(function () {
            closeMessageModal();
            showMessageModal();
        }, timerTime);
    }

    function startInnerTimer() {
        innerTimer = setTimeout(function () {
            closeMessageModal();
            startTimer();
        }, timerTime);
    }

    startTimer();
})();
