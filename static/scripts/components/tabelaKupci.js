import KupciService from '../services/kupci-service.js';

export default {
    props: ["kupci"],
    emits: ["brisanje", "izmena"],
    methods: {
        ukloni(kupca) {
            KupciService.delete(kupca.id).then(x=> {
                KupciService.getAll().then(x=>{
                    x.json().then(v=>{
                        this.podaciKupca = v;
                    })
                })
            });
        },
        izmeni(kupca) {
            this.$router.push(`/kupacForma/${kupca.id}`)
        }
    },
    data() {
        return {
            podaciKupca: []
        }
    },
    watch: {
        kupci: function(novaVrednost, staraVrednost) {
            this.podaciKupca = novaVrednost;
        }
    },
    created() {
        KupciService.getAll().then(response =>{
            response.json().then(v=> {
                this.podaciKupca = v;
            })
        })
    },
    template: `
    <table>
    <thead>
        <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Adresa</th>
            <th>Akcije</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(kupca, i) in podaciKupca">
            <td>{{kupca.ime}}</td>
            <td>{{kupca.prezime}}</td>
            <td>{{kupca.adresa}}</td>
            <td>
                <button @click="ukloni(kupca)">Ukloni</button>
                <button @click="izmeni(kupca)">Izmeni</button>
            </td>
        </tr>
    </tbody>
</table>
    `
}
