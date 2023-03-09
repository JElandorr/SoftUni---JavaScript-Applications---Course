export async function loadData() {
    const url = "http://localhost:3030/jsonstore/advanced/table";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        alert(error.message);
    }
}
