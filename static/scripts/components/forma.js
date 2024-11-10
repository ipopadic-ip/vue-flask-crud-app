import ProizvodiService from '../services/proizvodi-service.js';
import KupciService from '../services/kupci-service.js';

export default {
    props: ["proizvod"],
    emits: ["sacuvaj"],
    methods: {
        sacuvaj() {
            if(this.noviProizvod.id != undefined) {
                ProizvodiService.update(this.noviProizvod).then(x => {
                    this.$router.push("/");
                });
            } else {
                ProizvodiService.create(this.noviProizvod).then(x=>{
                    this.$router.push("/");
                });
            }
        },
        ponistiFormu() {
            this.noviProizvod = {};
        }
    },
    watch: {
        student(novaVrednost, staraVrednost) {
            this.noviProizvod = novaVrednost;
            // this.noviProizvod = {...novaVrednost, studijski_program:{id:student.studijski_program}}
        }
    },
    data() {
        return {
            noviProizvod: {},
            kupci: [],
            // defaultSmer: null
        }
    },
    created() {
        if(this.$route.params.idProizvoda) {
            ProizvodiService.getById(this.$route.params.idProizvoda).then(r => {
                if (r.status == 200) {
                    r.json().then(podaci => {
                        this.noviProizvod = podaci;
                        // this.defaultSmer = podaci.studijski_program.id;
                    })
                }
            });
        }
        KupciService.getAll().then(r => {
            if (r.status == 200) {
                r.json().then(podaci => {
                    this.kupci = podaci;
                })
            }
        })
    },
    template: `
    <form v-on:submit.prevent="sacuvaj()" action="">
    <div>
    <label>Naziv: <input v-model="noviProizvod.naziv" type="text" required></label>
    </div>
    <div>
    <label>Opis: <input v-model="noviProizvod.opis" type="text" required></label>
    </div>
    <div>
    <label>Cena: <input v-model="noviProizvod.cena" type="number" required></label>
    </div>
    <div>
    <label>Kolicina: <input v-model="noviProizvod.kolicina" type="number" required></label>
    </div>
    <div>
    <label>Datum Kupovine: <input v-model="noviProizvod.datum_kupovine" type="date" required></label>
    </div>
    <div>
    <label>Kupac:
        <select v-model="noviProizvod.kupac" required>
            <option v-for="jed_kupac in kupci" :value="jed_kupac.id" :selected="noviProizvod.kupac == jed_kupac.id">{{jed_kupac.id}}</option>
        </select>
    </label>
    </div>

    <button v-if="noviProizvod.id != undefined" type="submit">Izmeni</button>
    <button v-if="noviProizvod.id != undefined" type="reset" @click="ponistiFormu()">Odustani</button>
    <button v-else type="submit">Dodaj</button>
</form>
    `
}
