export default {
    baseUrl: "",
    getAll() {
        return fetch(`${this.baseUrl}`);
    },
    getById(id) {
        return fetch(`${this.baseUrl}/${id}`);
    },
    create(value) {
        return fetch(`${this.baseUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        });
    },
    delete(id) {
        return fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE"
        });
    },
    update(value) {
        return fetch(`${this.baseUrl}/${value.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        });
    }
}
