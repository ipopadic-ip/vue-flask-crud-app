import ProizvodiService from '../services/proizvodi-service.js';
import KupciService from '../services/kupci-service.js';

export default {
    props: ["kupac"],
    emits: ["sacuvaj"],
    methods: {
        sacuvaj() {
            if(this.noviKupac.id != undefined) {
                KupciService.update(this.noviKupac).then(x => {
                    this.$router.push("/");
                });
            } else {
                KupciService.create(this.noviKupac).then(x=>{
                    this.$router.push("/");
                });
            }
        },
        ponistiFormu() {
            this.noviKupac = {};
        }
    },
    watch: {
        student(novaVrednost, staraVrednost) {
            this.noviKupac = novaVrednost;
            // this.noviProizvod = {...novaVrednost, studijski_program:{id:student.studijski_program}}
        }
    },
    data() {
        return {
            noviKupac: {},
            proizvodi: [],
            // defaultSmer: null
        }
    },
    created() {
        if(this.$route.params.idKupca) {
            KupciService.getById(this.$route.params.idKupca).then(r => {
                if (r.status == 200) {
                    r.json().then(podaci => {
                        this.noviKupac = podaci;
                        // this.defaultSmer = podaci.studijski_program.id;
                    })
                }
            });
        }
        ProizvodiService.getAll().then(r => {
            if (r.status == 200) {
                r.json().then(podaci => {
                    this.proizvodi = podaci;
                })
            }
        })
    },
    template: `
    <form v-on:submit.prevent="sacuvaj()" action="">
    <div>
    <label>Ime: <input v-model="noviKupac.ime" type="text" required></label>
    </div>
    <div>
    <label>Prezime: <input v-model="noviKupac.prezime" type="text" required></label>
    </div>
    <div>
    <label>Adresa: <input v-model="noviKupac.adresa" type="text" required></label>
    </div>

    <button v-if="noviKupac.id != undefined" type="submit">Izmeni</button>
    <button v-if="noviKupac.id != undefined" type="reset" @click="ponistiFormu()">Odustani</button>
    <button v-else type="submit">Dodaj</button>
</form>
    `
}
