import PrimerKomponente from "./components/primer-komponente.js"
import Tabela from "./components/tabela.js"
import Forma from "./components/forma.js"
import TabelaKupci from "./components/tabelaKupci.js";
import FormaKupci from "./components/formaKupci.js";

import ProizvodiService from './services/proizvodi-service.js';
import kupciService from "./services/kupci-service.js";

fetch("/api/proizvodi").then(response => {
    let json = response.json().then(vrednosti => {
        console.log(vrednosti);
    });
});
fetch("/api/kupci").then(response => {
    let json = response.json().then(vrednosti => {
        console.log(vrednosti);
    });
});
const { createApp } = Vue

const app = createApp(
    {
        data() {
            return {
            }
        },
        created() {
            // StudentiService.primer().then(r => {
            //     console.log(r);
            // }, reason=> {
            //     console.log("Promis neuspesno razresen: " + reason);
            // });
        },
        methods: {
        }
    }
);

app.use(VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        { path: "/", component: Tabela },
        { path: "/tabelaKupci", component: TabelaKupci },
        { path: "/proizvodForma", component: Forma },
        { path: "/proizvodForma/:idProizvoda", component: Forma },
        { path: "/kupacForma", component: FormaKupci },
        { path: "/kupacForma/:idKupca", component: FormaKupci },
    ]
}));

// app.component("primer-komponente", PrimerKomponente);

app.component("tabela", Tabela);
app.component("tabelaKupci", TabelaKupci);
app.component("forma", Forma);
app.component("formaKupci", FormaKupci);
app.mount('#app');

console.log(app);
