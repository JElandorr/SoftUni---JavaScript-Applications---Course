console.log("before");

setTimeout(waitForMe, 3000);

console.log("after");

function waitForMe() {
    console.log("waitForMe is executed!");
}
