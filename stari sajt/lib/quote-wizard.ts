export type ProjectType = 
  | 'house' 
  | 'building' 
  | 'commercial' 
  | 'interior' 
  | 'reconstruction' 
  | 'visualization'

export interface WizardStep {
  id: string
  title: string
  fields: WizardField[]
}

export interface WizardField {
  id: string
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'number' | 'file' | 'date' | 'email'
  label: string
  placeholder?: string
  helpText?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export const wizardConfigs: Record<ProjectType, WizardStep[]> = {
  house: [
    {
      id: 'location',
      title: 'Lokacija i parcela',
      fields: [
        {
          id: 'location',
          type: 'text',
          label: 'Lokacija (grad/opština)',
          placeholder: 'npr. Teslić',
          required: true,
        },
        {
          id: 'address',
          type: 'text',
          label: 'Adresa parcele (opciono)',
          placeholder: 'Ulica i broj',
        },
        {
          id: 'parcelStatus',
          type: 'radio',
          label: 'Status parcele',
          required: true,
          options: [
            { value: 'have', label: 'Imam parcelu' },
            { value: 'buying', label: 'Kupujem parcelu' },
            { value: 'in-process', label: 'U procesu kupovine' },
          ],
        },
        {
          id: 'parcelArea',
          type: 'number',
          label: 'Površina parcele (m²)',
          placeholder: 'npr. 500',
          required: true,
          validation: { min: 0 },
        },
        {
          id: 'urbanConditions',
          type: 'radio',
          label: 'Da li postoji urbanistički uslovi / regulacioni plan?',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'urbanConditionsFile',
          type: 'file',
          label: 'Upload urbanističkih uslova (ako imate)',
          helpText: 'PDF, JPG, PNG (max 5MB)',
        },
      ],
    },
    {
      id: 'program',
      title: 'Program prostorija',
      fields: [
        {
          id: 'floors',
          type: 'select',
          label: 'Broj spratova',
          required: true,
          options: [
            { value: 'Pr', label: 'Prizemlje (Pr)' },
            { value: 'Pr+1', label: 'Prizemlje + 1 (Pr+1)' },
            { value: 'Pr+Pk', label: 'Prizemlje + Potkrovlje (Pr+Pk)' },
            { value: 'Po+Pr+1', label: 'Podrum + Prizemlje + 1 (Po+Pr+1)' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'bedrooms',
          type: 'number',
          label: 'Broj spavaćih soba',
          placeholder: 'npr. 3',
          required: true,
          validation: { min: 1 },
        },
        {
          id: 'bathrooms',
          type: 'number',
          label: 'Broj kupatila/WC',
          placeholder: 'npr. 2',
          required: true,
          validation: { min: 1 },
        },
        {
          id: 'garage',
          type: 'radio',
          label: 'Garaža',
          required: true,
          options: [
            { value: 'no', label: 'Ne' },
            { value: '1-car', label: 'Da (1 auto)' },
            { value: '2-car', label: 'Da (2 auta)' },
          ],
        },
        {
          id: 'terrace',
          type: 'radio',
          label: 'Terasa/balkon/veranda',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
          ],
        },
        {
          id: 'additionalRooms',
          type: 'checkbox',
          label: 'Dodatne prostorije',
          options: [
            { value: 'storage', label: 'Ostava' },
            { value: 'laundry', label: 'Vešeraj' },
            { value: 'boiler', label: 'Kotlovnica' },
            { value: 'office', label: 'Radna soba' },
            { value: 'sauna', label: 'Sauna' },
            { value: 'other', label: 'Drugo' },
          ],
        },
      ],
    },
    {
      id: 'dimensions',
      title: 'Dimenzije i kvadrature',
      fields: [
        {
          id: 'targetBGP',
          type: 'number',
          label: 'Ciljana BGP (m²)',
          placeholder: 'npr. 200',
          helpText: 'Bruto građevinska površina',
          validation: { min: 0 },
        },
        {
          id: 'targetNGP',
          type: 'number',
          label: 'Ciljana NGP (m²)',
          placeholder: 'npr. 150',
          helpText: 'Neto građevinska površina',
          validation: { min: 0 },
        },
        {
          id: 'groundFloorArea',
          type: 'number',
          label: 'Površina prizemlja (procjena, m²)',
          placeholder: 'npr. 100',
          validation: { min: 0 },
        },
        {
          id: 'floorHeight',
          type: 'select',
          label: 'Visina etaže',
          options: [
            { value: 'standard', label: 'Standardna (2.7-3.0m)' },
            { value: 'higher', label: 'Viša (3.0m+)' },
          ],
        },
      ],
    },
    {
      id: 'construction',
      title: 'Konstrukcija i materijali',
      fields: [
        {
          id: 'constructionType',
          type: 'radio',
          label: 'Tip konstrukcije',
          required: true,
          options: [
            { value: 'reinforced-concrete', label: 'Armirano-betonska' },
            { value: 'masonry', label: 'Zidana' },
            { value: 'prefabricated', label: 'Montažna' },
            { value: 'combined', label: 'Kombinovano' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'facade',
          type: 'radio',
          label: 'Tip fasade',
          options: [
            { value: 'dmit', label: 'Demit' },
            { value: 'ventilated', label: 'Ventilisana' },
            { value: 'natural', label: 'Prirodni materijali' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'facadeColor',
          type: 'text',
          label: 'Boja fasade (opciono)',
          placeholder: 'npr. bež, siva, bijela',
        },
        {
          id: 'windows',
          type: 'radio',
          label: 'Stolarija',
          options: [
            { value: 'PVC', label: 'PVC' },
            { value: 'ALU', label: 'ALU' },
            { value: 'wood', label: 'Drvo' },
            { value: 'combined', label: 'Kombinovano' },
          ],
        },
        {
          id: 'roof',
          type: 'radio',
          label: 'Tip krova',
          options: [
            { value: 'flat', label: 'Ravan' },
            { value: 'gable', label: 'Dvovodni' },
            { value: 'hip', label: 'Četvorovodni' },
            { value: 'combined', label: 'Kombinovano' },
          ],
        },
        {
          id: 'roofCovering',
          type: 'radio',
          label: 'Pokrivač krova',
          options: [
            { value: 'tile', label: 'Crijep' },
            { value: 'metal', label: 'Lim' },
            { value: 'membrane', label: 'Membrana' },
            { value: 'other', label: 'Drugo' },
          ],
        },
      ],
    },
    {
      id: 'energy',
      title: 'Energetika i instalacije',
      fields: [
        {
          id: 'heating',
          type: 'radio',
          label: 'Sistem grijanja',
          options: [
            { value: 'heat-pump', label: 'Toplotna pumpa' },
            { value: 'pellet', label: 'Pelet' },
            { value: 'gas', label: 'Gas' },
            { value: 'electric', label: 'Struja' },
            { value: 'central', label: 'Centralno' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'cooling',
          type: 'radio',
          label: 'Sistem hlađenja',
          options: [
            { value: 'multi-split', label: 'Multi-split' },
            { value: 'VRF', label: 'VRF' },
            { value: 'passive', label: 'Pasivno' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'ventilation',
          type: 'radio',
          label: 'Ventilacija sa rekuperacijom',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'maybe', label: 'Možda' },
          ],
        },
        {
          id: 'solar',
          type: 'radio',
          label: 'Solarne ploče',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'maybe', label: 'Možda' },
          ],
        },
      ],
    },
    {
      id: 'exterior',
      title: 'Eksterijer',
      fields: [
        {
          id: 'fence',
          type: 'radio',
          label: 'Ograda',
          options: [
            { value: 'no', label: 'Ne' },
            { value: 'metal', label: 'Da (metal)' },
            { value: 'wood', label: 'Da (drvo)' },
            { value: 'concrete', label: 'Da (beton)' },
            { value: 'wall', label: 'Da (zid)' },
          ],
        },
        {
          id: 'gate',
          type: 'radio',
          label: 'Kapija',
          options: [
            { value: 'sliding', label: 'Klizna' },
            { value: 'swing', label: 'Krilna' },
            { value: 'no', label: 'Ne treba' },
          ],
        },
        {
          id: 'landscaping',
          type: 'radio',
          label: 'Uređenje dvorišta',
          options: [
            { value: 'minimal', label: 'Minimalno' },
            { value: 'medium', label: 'Srednje' },
            { value: 'full', label: 'Full (staze, rasvjeta, zelenilo)' },
          ],
        },
        {
          id: 'pool',
          type: 'radio',
          label: 'Bazen',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'maybe', label: 'Možda' },
          ],
        },
      ],
    },
    {
      id: 'phase',
      title: 'Faza i rok',
      fields: [
        {
          id: 'neededPhase',
          type: 'checkbox',
          label: 'Šta vam treba?',
          required: true,
          options: [
            { value: 'idejni', label: 'Idejni projekat' },
            { value: 'glavni', label: 'Glavni projekat' },
            { value: 'izvedbeni', label: 'Izvedbeni projekat' },
            { value: '3d', label: '3D vizualizacije' },
            { value: 'all', label: 'Sve' },
          ],
        },
        {
          id: 'geodeticSurvey',
          type: 'radio',
          label: 'Da li imate geodetski snimak?',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
          ],
        },
        {
          id: 'geomechanics',
          type: 'radio',
          label: 'Da li imate geomehaniku?',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
          ],
        },
        {
          id: 'startDate',
          type: 'date',
          label: 'Kada želite da počne projektovanje?',
          required: true,
        },
        {
          id: 'completionDate',
          type: 'date',
          label: 'Kada želite da završi projekat?',
        },
        {
          id: 'budget',
          type: 'text',
          label: 'Budžet gradnje okvirno',
          placeholder: 'npr. 150.000 - 200.000 EUR',
          helpText: 'Opciono, ali pomaže u formiranju ponude',
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Skice, slike inspiracije, dokumenti',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG, DWG',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime',
          placeholder: 'npr. Marko Petrović',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
  building: [
    {
      id: 'location',
      title: 'Lokacija i regulativa',
      fields: [
        {
          id: 'location',
          type: 'text',
          label: 'Lokacija (grad/opština)',
          placeholder: 'npr. Teslić',
          required: true,
        },
        {
          id: 'address',
          type: 'text',
          label: 'Adresa parcele (opciono)',
          placeholder: 'Ulica i broj',
        },
        {
          id: 'urbanConditions',
          type: 'radio',
          label: 'Da li postoji urbanistički uslovi / regulacioni plan?',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'urbanConditionsFile',
          type: 'file',
          label: 'Upload urbanističkih uslova (ako imate)',
          helpText: 'PDF, JPG, PNG (max 5MB)',
        },
      ],
    },
    {
      id: 'program',
      title: 'Namjena i raspored',
      fields: [
        {
          id: 'residentialPercent',
          type: 'number',
          label: '% stanova',
          placeholder: 'npr. 70',
          helpText: 'Procenat stambenih jedinica',
          validation: { min: 0, max: 100 },
        },
        {
          id: 'commercialPercent',
          type: 'number',
          label: '% poslovnog prostora',
          placeholder: 'npr. 30',
          helpText: 'Procenat poslovnih prostora',
          validation: { min: 0, max: 100 },
        },
        {
          id: 'floors',
          type: 'select',
          label: 'Broj etaža',
          required: true,
          options: [
            { value: 'Po+Pr', label: 'Podrum + Prizemlje' },
            { value: 'Po+Pr+1', label: 'Podrum + Prizemlje + 1' },
            { value: 'Po+Pr+2', label: 'Podrum + Prizemlje + 2' },
            { value: 'Po+Pr+3', label: 'Podrum + Prizemlje + 3' },
            { value: 'Po+Pr+4', label: 'Podrum + Prizemlje + 4' },
            { value: 'Po+Pr+5', label: 'Podrum + Prizemlje + 5' },
            { value: 'Po+Pr+5+Pe', label: 'Podrum + Prizemlje + 5 + Penthouse' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'apartments',
          type: 'number',
          label: 'Broj stanova',
          placeholder: 'npr. 20',
          required: true,
          validation: { min: 1 },
        },
        {
          id: 'apartmentTypes',
          type: 'checkbox',
          label: 'Tipovi stanova',
          required: true,
          options: [
            { value: 'garsonjera', label: 'Garsonjera' },
            { value: '1-sob', label: 'Jednosobni' },
            { value: '2-sob', label: 'Dvosobni' },
            { value: '3-sob', label: 'Trosobni' },
            { value: '4-sob', label: 'Četvorosobni' },
            { value: 'penthouse', label: 'Penthouse' },
          ],
        },
        {
          id: 'parking',
          type: 'number',
          label: 'Broj parking mjesta',
          placeholder: 'npr. 25',
          validation: { min: 0 },
        },
        {
          id: 'elevator',
          type: 'radio',
          label: 'Lift',
          options: [
            { value: 'no', label: 'Ne' },
            { value: '1', label: 'Da (1 lift)' },
            { value: '2', label: 'Da (2 lifta)' },
            { value: 'more', label: 'Više od 2' },
          ],
        },
        {
          id: 'fireSafety',
          type: 'radio',
          label: 'Protivpožarni zahtjevi',
          helpText: 'Ako znate specifične zahtjeve',
          options: [
            { value: 'standard', label: 'Standardni' },
            { value: 'enhanced', label: 'Povećani' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
      ],
    },
    {
      id: 'dimensions',
      title: 'Dimenzije i kvadrature',
      fields: [
        {
          id: 'targetBGP',
          type: 'number',
          label: 'Ciljana BGP (m²)',
          placeholder: 'npr. 2000',
          helpText: 'Bruto građevinska površina',
          validation: { min: 0 },
        },
        {
          id: 'targetNGP',
          type: 'number',
          label: 'Ciljana NGP (m²)',
          placeholder: 'npr. 1500',
          helpText: 'Neto građevinska površina',
          validation: { min: 0 },
        },
      ],
    },
    {
      id: 'phase',
      title: 'Faza i rok',
      fields: [
        {
          id: 'neededPhase',
          type: 'checkbox',
          label: 'Šta vam treba?',
          required: true,
          options: [
            { value: 'idejni', label: 'Idejni projekat' },
            { value: 'glavni', label: 'Glavni projekat' },
            { value: 'izvedbeni', label: 'Izvedbeni projekat' },
            { value: '3d', label: '3D vizualizacije' },
            { value: 'all', label: 'Sve' },
          ],
        },
        {
          id: 'startDate',
          type: 'date',
          label: 'Kada želite da počne projektovanje?',
          required: true,
        },
        {
          id: 'completionDate',
          type: 'date',
          label: 'Kada želite da završi projekat?',
        },
        {
          id: 'budget',
          type: 'text',
          label: 'Budžet gradnje okvirno',
          placeholder: 'npr. 2.000.000 - 3.000.000 EUR',
          helpText: 'Opciono, ali pomaže u formiranju ponude',
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Urbanistički uslovi, geodetski snimak, ideje',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG, DWG',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime',
          placeholder: 'npr. Marko Petrović',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
  commercial: [
    {
      id: 'basic',
      title: 'Osnovne informacije',
      fields: [
        {
          id: 'location',
          type: 'text',
          label: 'Lokacija (grad/opština)',
          placeholder: 'npr. Teslić',
          required: true,
        },
        {
          id: 'address',
          type: 'text',
          label: 'Adresa (opciono)',
          placeholder: 'Ulica i broj',
        },
        {
          id: 'buildingType',
          type: 'radio',
          label: 'Tip poslovnog objekta',
          required: true,
          options: [
            { value: 'offices', label: 'Kancelarije' },
            { value: 'hall', label: 'Hala / Skladište' },
            { value: 'shop', label: 'Trgovina' },
            { value: 'restaurant', label: 'Ugostiteljstvo' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'area',
          type: 'number',
          label: 'Površina (m²)',
          placeholder: 'npr. 500',
          required: true,
          validation: { min: 0 },
        },
        {
          id: 'height',
          type: 'number',
          label: 'Visina objekta (m)',
          placeholder: 'npr. 6',
          helpText: 'Bitno za hale i skladišta',
          validation: { min: 0 },
        },
      ],
    },
    {
      id: 'needs',
      title: 'Potrebe i funkcionalnost',
      fields: [
        {
          id: 'requirements',
          type: 'checkbox',
          label: 'Potrebni prostori',
          options: [
            { value: 'warehouse', label: 'Skladište' },
            { value: 'offices', label: 'Kancelarije' },
            { value: 'sanitary', label: 'Sanitarije' },
            { value: 'kitchen', label: 'Kuhinja' },
            { value: 'parking', label: 'Parking' },
            { value: 'truck-access', label: 'Pristup šleper' },
            { value: 'loading-dock', label: 'Utovarna rampa' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'specialNeeds',
          type: 'textarea',
          label: 'Posebne potrebe (opciono)',
          placeholder: 'npr. klima komora, čista soba, itd.',
        },
      ],
    },
    {
      id: 'materials',
      title: 'Materijali i fasada',
      fields: [
        {
          id: 'facade',
          type: 'radio',
          label: 'Tip fasade',
          options: [
            { value: 'dmit', label: 'Demit' },
            { value: 'ventilated', label: 'Ventilisana' },
            { value: 'metal', label: 'Metal' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'brandColors',
          type: 'text',
          label: 'Brand boje (opciono)',
          placeholder: 'npr. #FF5733, plava, crvena',
          helpText: 'Ako imate korporativne boje',
        },
        {
          id: 'logo',
          type: 'file',
          label: 'Upload logotipa (opciono)',
          helpText: 'Za integraciju u dizajn',
        },
      ],
    },
    {
      id: 'installations',
      title: 'Instalacije',
      fields: [
        {
          id: 'ventilation',
          type: 'radio',
          label: 'Ventilacija',
          options: [
            { value: 'natural', label: 'Prirodna' },
            { value: 'mechanical', label: 'Mehanička' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'cooling',
          type: 'radio',
          label: 'Klima',
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'maybe', label: 'Možda' },
          ],
        },
        {
          id: 'electrical',
          type: 'text',
          label: 'Elektro snage (kW)',
          placeholder: 'npr. 50',
          helpText: 'Ako znate potrebne snage',
        },
      ],
    },
    {
      id: 'deadline',
      title: 'Rok i budžet',
      fields: [
        {
          id: 'openingDate',
          type: 'date',
          label: 'Rok otvaranja / puštanja u rad',
          required: true,
        },
        {
          id: 'budget',
          type: 'text',
          label: 'Budžet okvirno',
          placeholder: 'npr. 500.000 - 800.000 EUR',
          helpText: 'Opciono',
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Logo, slike inspiracije, skice, postojeći projekti',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG, DWG',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime / Naziv firme',
          placeholder: 'npr. Marko Petrović ili ABC d.o.o.',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
  interior: [
    {
      id: 'basic',
      title: 'Osnovne informacije',
      fields: [
        {
          id: 'spaceType',
          type: 'radio',
          label: 'Vrsta prostora',
          required: true,
          options: [
            { value: 'apartment', label: 'Stan' },
            { value: 'house', label: 'Kuća' },
            { value: 'office', label: 'Kancelarija' },
            { value: 'commercial', label: 'Poslovni lokal' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'area',
          type: 'number',
          label: 'Površina (m²)',
          placeholder: 'npr. 80',
          required: true,
          validation: { min: 0 },
        },
        {
          id: 'rooms',
          type: 'number',
          label: 'Broj prostorija',
          placeholder: 'npr. 5',
          required: true,
          validation: { min: 1 },
        },
        {
          id: 'style',
          type: 'radio',
          label: 'Stil',
          required: true,
          options: [
            { value: 'modern', label: 'Moderan' },
            { value: 'minimal', label: 'Minimal' },
            { value: 'classic', label: 'Klasičan' },
            { value: 'industrial', label: 'Industrijski' },
            { value: 'scandinavian', label: 'Skandinavski' },
            { value: 'luxury', label: 'Luksuz' },
            { value: 'other', label: 'Drugo' },
          ],
        },
        {
          id: 'budget',
          type: 'radio',
          label: 'Budžet',
          required: true,
          options: [
            { value: 'low', label: 'Nizak (do 10.000 EUR)' },
            { value: 'medium', label: 'Srednji (10.000 - 30.000 EUR)' },
            { value: 'high', label: 'Visok (30.000+ EUR)' },
          ],
        },
      ],
    },
    {
      id: 'furniture',
      title: 'Namještaj',
      fields: [
        {
          id: 'furnitureStatus',
          type: 'radio',
          label: 'Namještaj',
          required: true,
          options: [
            { value: 'keep', label: 'Zadržavam postojeći' },
            { value: 'replace', label: 'Mijenjam sve' },
            { value: 'combine', label: 'Kombinujem postojeći sa novim' },
          ],
        },
        {
          id: 'kitchen',
          type: 'radio',
          label: 'Kuhinja',
          options: [
            { value: 'no', label: 'Ne treba' },
            { value: 'yes', label: 'Da, treba nova' },
            { value: 'renovate', label: 'Da, renovacija postojeće' },
          ],
        },
        {
          id: 'kitchenMaterials',
          type: 'text',
          label: 'Materijali za kuhinju (opciono)',
          placeholder: 'npr. MDF, laminat, drvo',
          helpText: 'Ako znate šta želite',
        },
        {
          id: 'kitchenColors',
          type: 'text',
          label: 'Boje kuhinje (opciono)',
          placeholder: 'npr. bijela, siva, drvena',
        },
        {
          id: 'kitchenAppliances',
          type: 'checkbox',
          label: 'Uređaji za kuhinju',
          options: [
            { value: 'fridge', label: 'Frižider' },
            { value: 'oven', label: 'Šporet / Pećnica' },
            { value: 'dishwasher', label: 'Mašina za pranje sudova' },
            { value: 'hood', label: 'Napa' },
            { value: 'microwave', label: 'Mikrotalasna' },
          ],
        },
      ],
    },
    {
      id: 'lighting',
      title: 'Rasvjeta',
      fields: [
        {
          id: 'lighting',
          type: 'radio',
          label: 'Tip rasvjete',
          required: true,
          options: [
            { value: 'basic', label: 'Osnovna' },
            { value: 'scenarios', label: 'Scenariji rasvjete' },
            { value: 'smart', label: 'Smart rasvjeta' },
          ],
        },
        {
          id: 'lightingNotes',
          type: 'textarea',
          label: 'Napomene o rasvjeti (opciono)',
          placeholder: 'npr. želim LED trake, dimmer, itd.',
        },
      ],
    },
    {
      id: 'deadline',
      title: 'Rok',
      fields: [
        {
          id: 'moveInDate',
          type: 'date',
          label: 'Rok useljenja / otvaranja',
          required: true,
        },
        {
          id: 'urgency',
          type: 'radio',
          label: 'Hitnost',
          options: [
            { value: 'normal', label: 'Normalna' },
            { value: 'urgent', label: 'Hitno' },
            { value: 'flexible', label: 'Fleksibilno' },
          ],
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Tlocrt, slike postojećeg stanja, inspiracije',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime',
          placeholder: 'npr. Marko Petrović',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
  reconstruction: [
    {
      id: 'scope',
      title: 'Obim radova',
      fields: [
        {
          id: 'workType',
          type: 'checkbox',
          label: 'Šta se radi?',
          required: true,
          options: [
            { value: 'facade', label: 'Fasada' },
            { value: 'roof', label: 'Krov' },
            { value: 'extension', label: 'Dogradnja' },
            { value: 'interior', label: 'Unutrašnje prostorije' },
            { value: 'all', label: 'Sve (kompleksna rekonstrukcija)' },
          ],
        },
        {
          id: 'demolition',
          type: 'radio',
          label: 'Da li se ruše zidovi?',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'buildingCondition',
          type: 'textarea',
          label: 'Stanje objekta',
          placeholder: 'npr. Starost, vlaga, pukotine, itd.',
          required: true,
        },
        {
          id: 'buildingAge',
          type: 'number',
          label: 'Starost objekta (godine)',
          placeholder: 'npr. 30',
          validation: { min: 0 },
        },
      ],
    },
    {
      id: 'existing',
      title: 'Postojeća dokumentacija',
      fields: [
        {
          id: 'hasProject',
          type: 'radio',
          label: 'Da li postoji postojeći projekat?',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'projectType',
          type: 'radio',
          label: 'Tip postojećeg projekta (ako postoji)',
          options: [
            { value: 'idejni', label: 'Idejni' },
            { value: 'glavni', label: 'Glavni' },
            { value: 'izvedbeni', label: 'Izvedbeni' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
      ],
    },
    {
      id: 'permits',
      title: 'Dozvole',
      fields: [
        {
          id: 'permits',
          type: 'radio',
          label: 'Da li trebaju dozvole?',
          required: true,
          options: [
            { value: 'yes', label: 'Da, treba' },
            { value: 'no', label: 'Ne treba' },
            { value: 'unknown', label: 'Ne znam' },
          ],
        },
        {
          id: 'permitType',
          type: 'checkbox',
          label: 'Tip dozvole (ako treba)',
          options: [
            { value: 'building', label: 'Građevinska dozvola' },
            { value: 'use', label: 'Upotrebna dozvola' },
            { value: 'reconstruction', label: 'Dozvola za rekonstrukciju' },
            { value: 'other', label: 'Drugo' },
          ],
        },
      ],
    },
    {
      id: 'phase',
      title: 'Faza i rok',
      fields: [
        {
          id: 'neededPhase',
          type: 'checkbox',
          label: 'Šta vam treba?',
          required: true,
          options: [
            { value: 'idejni', label: 'Idejni projekat' },
            { value: 'glavni', label: 'Glavni projekat' },
            { value: 'izvedbeni', label: 'Izvedbeni projekat' },
            { value: '3d', label: '3D vizualizacije' },
            { value: 'all', label: 'Sve' },
          ],
        },
        {
          id: 'startDate',
          type: 'date',
          label: 'Kada želite da počne projektovanje?',
          required: true,
        },
        {
          id: 'completionDate',
          type: 'date',
          label: 'Kada želite da završi projekat?',
        },
        {
          id: 'budget',
          type: 'text',
          label: 'Budžet rekonstrukcije okvirno',
          placeholder: 'npr. 50.000 - 100.000 EUR',
          helpText: 'Opciono, ali pomaže u formiranju ponude',
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Slike, tlocrt, postojeća dokumentacija',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG, DWG',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime',
          placeholder: 'npr. Marko Petrović',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
  visualization: [
    {
      id: 'scope',
      title: 'Obim vizualizacije',
      fields: [
        {
          id: 'visualizationType',
          type: 'checkbox',
          label: 'Za šta treba vizualizacija?',
          required: true,
          options: [
            { value: 'exterior', label: 'Eksterijer' },
            { value: 'interior', label: 'Enterijer' },
            { value: 'both', label: 'Oba' },
          ],
        },
        {
          id: 'hasModel',
          type: 'radio',
          label: 'Da li imate 3D model?',
          required: true,
          options: [
            { value: 'yes', label: 'Da' },
            { value: 'no', label: 'Ne' },
            { value: 'partial', label: 'Djelomično' },
          ],
        },
        {
          id: 'modelFormat',
          type: 'checkbox',
          label: 'Format modela (ako imate)',
          options: [
            { value: 'dwg', label: 'DWG' },
            { value: 'archicad', label: 'ArchiCAD' },
            { value: 'revit', label: 'Revit' },
            { value: 'sketchup', label: 'SketchUp' },
            { value: 'other', label: 'Drugo' },
          ],
        },
      ],
    },
    {
      id: 'details',
      title: 'Detalji rendera',
      fields: [
        {
          id: 'renderCount',
          type: 'number',
          label: 'Broj rendera',
          placeholder: 'npr. 5',
          required: true,
          validation: { min: 1 },
        },
        {
          id: 'renderStyle',
          type: 'checkbox',
          label: 'Stil rendera',
          required: true,
          options: [
            { value: 'day', label: 'Dan' },
            { value: 'night', label: 'Noć' },
            { value: 'sunset', label: 'Zalazak sunca' },
            { value: 'winter', label: 'Zima' },
          ],
        },
        {
          id: 'resolution',
          type: 'radio',
          label: 'Rezolucija',
          required: true,
          options: [
            { value: 'web', label: 'Web (1920x1080)' },
            { value: 'print', label: 'Print (300 DPI)' },
            { value: 'billboard', label: 'Bilbord (4K+)' },
            { value: 'custom', label: 'Prilagođeno' },
          ],
        },
        {
          id: 'purpose',
          type: 'radio',
          label: 'Namjena',
          required: true,
          options: [
            { value: 'marketing', label: 'Marketing' },
            { value: 'presentation', label: 'Prezentacija' },
            { value: 'approval', label: 'Odobrenje' },
            { value: 'other', label: 'Drugo' },
          ],
        },
      ],
    },
    {
      id: 'deadline',
      title: 'Rok',
      fields: [
        {
          id: 'deadline',
          type: 'date',
          label: 'Rok završetka',
          required: true,
        },
        {
          id: 'urgency',
          type: 'radio',
          label: 'Hitnost',
          required: true,
          options: [
            { value: 'urgent', label: 'Hitno (1-3 dana)' },
            { value: 'standard', label: 'Standardno (1-2 nedelje)' },
            { value: 'flexible', label: 'Fleksibilno' },
          ],
        },
      ],
    },
    {
      id: 'upload',
      title: 'Upload dokumenata',
      fields: [
        {
          id: 'files',
          type: 'file',
          label: 'Nacrti, referentne slike, modeli',
          helpText: 'Možete upload-ovati više fajlova (max 10, ukupno max 25MB). PDF, JPG, PNG, DWG, ArchiCAD, Revit, SketchUp',
        },
      ],
    },
    {
      id: 'contact',
      title: 'Kontakt podaci',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Ime i prezime',
          placeholder: 'npr. Marko Petrović',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email adresa',
          placeholder: 'npr. marko@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'text',
          label: 'Telefon',
          placeholder: 'npr. +387 65 123-456',
          required: true,
        },
        {
          id: 'notes',
          type: 'textarea',
          label: 'Dodatne napomene (opciono)',
          placeholder: 'Ovdje možete dodati bilo koje dodatne informacije...',
        },
      ],
    },
  ],
}
