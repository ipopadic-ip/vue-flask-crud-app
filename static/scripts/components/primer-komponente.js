export default {
    props: ["poruka"],
    emits: ["klik"],
    methods: {
        obrada() {
            this.brojac++;
            this.$emit("klik", this.brojac);
        }
    },
    data() {
        return {
            brojac: 0,
        }
    },
    template: `
    <button @click="obrada()">Uvecaj</button>
    <p>{{poruka}}: {{brojac}}</p>
    `
}
