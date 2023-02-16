async function start() {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000, 5);
    });

    const result = await myPromise;
    console.log(result);
}

start();
