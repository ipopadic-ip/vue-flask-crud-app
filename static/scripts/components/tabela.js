import ProizvodiService from '../services/proizvodi-service.js';

export default {
    props: ["proizvodi"],
    emits: ["brisanje", "izmena"],
    methods: {
        ukloni(proizvod) {
            ProizvodiService.delete(proizvod.id).then(x=> {
                ProizvodiService.getAll().then(x=>{
                    x.json().then(v=>{
                        this.podaciProizvoda = v;
                    })
                })
            });
        },
        izmeni(proizvod) {
            this.$router.push(`/proizvodForma/${proizvod.id}`)
        }
    },
    data() {
        return {
            podaciProizvoda: []
        }
    },
    watch: {
        proizvodi: function(novaVrednost, staraVrednost) {
            this.podaciProizvoda = novaVrednost;
        }
    },
    created() {
        ProizvodiService.getAll().then(response =>{
            response.json().then(v=> {
                this.podaciProizvoda = v;
            })
        })
    },
    template: `
    <table>
    <thead>
        <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Kolicina</th>
            <th>Datum kupovine</th>
            <th>Kupac</th>
            <th>Akcije</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(proizvod, i) in podaciProizvoda">
            <td>{{proizvod.naziv}}</td>
            <td>{{proizvod.opis}}</td>
            <td>{{proizvod.cena}}</td>
            <td>{{proizvod.kolicina}}</td>
            <td>{{proizvod.datum_kupovine}}</td>
            <td>{{proizvod.kupac.id}}</td>
            <td>
                <button @click="ukloni(proizvod)">Ukloni</button>
                <button @click="izmeni(proizvod)">Izmeni</button>
            </td>
        </tr>
    </tbody>
</table>
    `
}
