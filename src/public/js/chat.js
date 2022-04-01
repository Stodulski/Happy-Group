$(document).ready(function () {
    const socket = io();

    // notificaion nuevo usuario

    socket.on("newUser", (username) => {
        $(".message__container")
            .append(
                `<span class="message__new">${username} se ah unido al chat.</span>`
            )
            .scrollTop($(".message__container")[0].scrollHeight);
    });

    // enviar mensaje

    $(".message__text").keypress((e) => {
        send(e);
    });
    $(".message__send").click(() => {
        let mensaje = $(".message__text").val();
        if (mensaje.trim().length <= 0) return;
        $(".message__text").val("");
        socket.emit("newMessage", mensaje);
    });

    // mensajes

    socket.on("receiveMessage", (data) => {
        $(".message__container").append(`<div class="message__received">
        <span><a href="/user/${data.username}">${data.username}</a></span>
        <p>${data.mensaje}</p>
    </div>`);
        $(".message__container").scrollTop(
            $(".message__container")[0].scrollHeight
        );
    });

    socket.on("sendMessage", (data) => {
        $(".message__container").append(`<div class="message__sended">
        <span><a href="/user/${data.username}">${data.username}</a></span>
        <p>${data.mensaje}</p>
    </div>`);
        $(".message__container").scrollTop(
            $(".message__container")[0].scrollHeight
        );
    });

    function send(event) {
        if (event.keyCode == 13) {
            let mensaje = $(".message__text").val();
            if (mensaje.trim().length <= 0) return;
            $(".message__text").val("");
            socket.emit("newMessage", mensaje);
        }
    }
});
