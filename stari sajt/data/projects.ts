export interface Project {
  id: string
  title: string
  location: string
  category: string
  description: string
  image?: string
  year?: number
  area?: string
  challenge?: string
  solution?: string
  materials?: string[]
  gallery?: string[]
}

export const projects: Project[] = [
  {
    id: 'porodicna-kuca-prnjavor',
    title: 'Moderna porodična kuća',
    location: 'Prnjavor, BiH',
    category: 'Stambeni',
    description: 'Savremena porodična kuća koja spaja funkcionalnost i estetiku. Dizajnirana za maksimalnu iskoristivost prostora uz visoke standarde kvaliteta.',
    image: '/images/projects/moderna porodicna kuca.png',
    year: 2023,
    area: '280 m²',
    challenge: 'Projektovanje funkcionalnog porodičnog prostora sa maksimalnom prirodnom svjetlošću na nepravilnoj parceli.',
    solution: 'Dizajn koji maksimalno iskorišćava orijentaciju prema jugu uz otvoreni koncept dnevnog boravka.',
    materials: ['Betona', 'Drvo', 'Staklo', 'Prirodni kamen'],
  },
  {
    id: 'poslovni-centar-doboj',
    title: 'Poslovni centar',
    location: 'Doboj, BiH',
    category: 'Poslovni',
    description: 'Višenamjenski poslovni objekat sa kancelarijskim prostorima i garažom. Moderan dizajn prilagođen poslovnim potrebama.',
    image: '/images/projects/poslovni centar.png',
    year: 2022,
    area: '1200 m²',
    challenge: 'Integracija više funkcija u urbano tkivo uz ograničen prostor parcele.',
    solution: 'Vertikalna organizacija prostora sa podzemnom garažom i fleksibilnim kancelarijskim etažama.',
    materials: ['Armiran beton', 'Fasadni paneli', 'ALU-PVC stolarija'],
  },
  {
    id: 'renovacija-istorijskog-objekta',
    title: 'Renovacija istorijskog objekta',
    location: 'Banja Luka, BiH',
    category: 'Renovacije',
    description: 'Obnova kulturno-istorijskog objekta uz očuvanje autentičnosti i uvođenje savremenih standarda.',
    image: '/images/projects/renovacija istorijskog objekta.png',
    year: 2023,
    area: '450 m²',
    challenge: 'Očuvanje istorijske vrijednosti uz usklađivanje sa modernim građevinskim propisima.',
    solution: 'Pažljiva restauracija uz implementaciju savremenih instalacija bez narušavanja originalne strukture.',
    materials: ['Tradicionalni materijali', 'Restaurirani elementi', 'Moderneinstalacije'],
  },
  {
    id: 'djecji-vrtic',
    title: 'Dječji vrtić',
    location: 'Prnjavor, BiH',
    category: 'Javni',
    description: 'Dizajn vrtića koji stimuliše razvoj djece kroz funkcionalnost i estetiku prostora.',
    image: '/images/projects/djeciji vrtic.png',
    year: 2022,
    area: '800 m²',
    challenge: 'Kreiranje sigurnog, inspirativnog i funkcionalnog prostora za djecu.',
    solution: 'Prostorne organizacije po dobnim grupama sa igralištima i zelenim površinama.',
    materials: ['Ekološki materijali', 'Sigurnosna oprema', 'Prirodno drvo'],
  },
  {
    id: 'apartmanski-kompleks',
    title: 'Apartmanski kompleks',
    location: 'Doboj, BiH',
    category: 'Stambeni',
    description: 'Moderni stambeni kompleks sa 24 stambene jedinice i zajedničkim sadržajima.',
    image: '/images/projects/apartmanski kompleks.png',
    year: 2023,
    area: '3200 m²',
    challenge: 'Obezbijediti privatnost i funkcionalnost uz maksimalnu iskoristivost prostora.',
    solution: 'Pametna organizacija stanova sa zajedničkim parkingom i zelenim površinama.',
    materials: ['Betona konstrukcija', 'Termofasada', 'Premium završne obrade'],
  },
  {
    id: 'vikend-kuca-jezero',
    title: 'Vikend kuća na jezeru',
    location: 'Bočac, BiH',
    category: 'Stambeni',
    description: 'Vikendica koja se savršeno uklapa u prirodno okruženje pored jezera.',
    image: '/images/projects/vikend kuca na jezeru.png',
    year: 2023,
    area: '150 m²',
    challenge: 'Integracija objekta u osjetljivo prirodno okruženje.',
    solution: 'Minimalistički dizajn sa velikim staklenim površinama prema jezeru.',
    materials: ['Drvo', 'Staklo', 'Prirodni kamen', 'Ekološki materijali'],
  },
]
