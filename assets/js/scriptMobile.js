//mobile
var el = document.getElementsByTagName("canvas")[0];
el.addEventListener("touchstart", handleStart);
el.addEventListener("touchmove", handleMove);
el.addEventListener("touchend", handleEnd);
el.addEventListener("touchcancel", handleCancel);

function touchHandler(e) {
    if(e.touches) {
        playerX = e.touches[0].pageX - canvas.offsetLeft - playerWidth / 2;
        playerY = e.touches[0].pageY - canvas.offsetTop - playerHeight / 2;
        output.textContent = `Touch: x: ${playerX}, y: ${playerY}`;
        e.preventDefault();
    }
}