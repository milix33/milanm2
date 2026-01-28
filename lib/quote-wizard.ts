export type ProjectType =
  | "house"
  | "building"
  | "commercial"
  | "interior"
  | "reconstruction"
  | "visualization";

type BaseOption = {
  value: string;
  label: string;
};

export type FieldType =
  | "text"
  | "email"
  | "textarea"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "file"
  | "date";

export interface WizardField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: BaseOption[];
  validation?: {
    min?: number;
    max?: number;
  };
}

export interface WizardStep {
  id: string;
  title: string;
  fields: WizardField[];
}

export const wizardConfigs: Record<ProjectType, WizardStep[]> = {
  house: [
    {
      id: "house-basic",
      title: "Osnovne informacije o kući",
      fields: [
        {
          id: "location",
          label: "Lokacija objekta",
          type: "text",
          required: true,
          placeholder: "Grad / opština"
        },
        {
          id: "area",
          label: "Približna bruto površina (m²)",
          type: "number",
          required: true,
          placeholder: "npr. 180",
          validation: { min: 30, max: 1000 }
        },
        {
          id: "floors",
          label: "Broj etaža",
          type: "select",
          required: true,
          options: [
            { value: "ground", label: "Prizemlje" },
            { value: "ground-plus-one", label: "P+1" },
            { value: "ground-plus-two", label: "P+2" }
          ]
        }
      ]
    },
    {
      id: "house-scope",
      title: "Obim usluge",
      fields: [
        {
          id: "services",
          label: "Šta vam je potrebno?",
          type: "checkbox",
          required: true,
          options: [
            { value: "concept", label: "Idejno rješenje" },
            { value: "main-project", label: "Glavni projekat" },
            { value: "supervision", label: "Stručni nadzor" },
            { value: "interior", label: "Enterijer" }
          ]
        },
        {
          id: "timeline",
          label: "Željeni rok",
          type: "select",
          required: true,
          options: [
            { value: "flexible", label: "Fleksibilno" },
            { value: "3-months", label: "Do 3 mjeseca" },
            { value: "6-months", label: "3–6 mjeseci" }
          ]
        }
      ]
    },
    {
      id: "house-contact",
      title: "Kontakt podaci",
      fields: [
        {
          id: "fullName",
          label: "Ime i prezime",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email adresa",
          type: "email",
          required: true,
          placeholder: "ime@domen.com"
        },
        {
          id: "phone",
          label: "Broj telefona",
          type: "text",
          required: false,
          placeholder: "+387..."
        },
        {
          id: "notes",
          label: "Dodatne napomene",
          type: "textarea",
          required: false,
          placeholder: "Npr. specifične želje, referentni primjeri..."
        },
        {
          id: "attachments",
          label: "Prilozi (skice, situacija, referentne slike)",
          type: "file",
          required: false,
          helpText: "Opcionalno – možete dodati PDF, slike ili DWG fajlove."
        }
      ]
    }
  ],
  building: [
    {
      id: "building-basic",
      title: "Osnovne informacije o zgradi",
      fields: [
        {
          id: "location",
          label: "Lokacija objekta",
          type: "text",
          required: true
        },
        {
          id: "units",
          label: "Broj stambenih jedinica",
          type: "number",
          required: true,
          validation: { min: 2, max: 200 }
        },
        {
          id: "program",
          label: "Namjena",
          type: "select",
          required: true,
          options: [
            { value: "residential", label: "Stambena" },
            { value: "mixed", label: "Stambeno-poslovna" },
            { value: "office", label: "Poslovna" }
          ]
        }
      ]
    },
    {
      id: "building-scope",
      title: "Obim angažmana",
      fields: [
        {
          id: "services",
          label: "Usluge koje su vam potrebne",
          type: "checkbox",
          required: true,
          options: [
            { value: "concept", label: "Idejno rješenje" },
            { value: "main-project", label: "Glavni projekat" },
            { value: "tender-docs", label: "Tenderska dokumentacija" },
            { value: "supervision", label: "Stručni nadzor" }
          ]
        },
        {
          id: "deadline",
          label: "Očekivani rok izrade",
          type: "date",
          required: false
        }
      ]
    },
    {
      id: "building-contact",
      title: "Kontakt podaci",
      fields: [
        {
          id: "company",
          label: "Naziv firme / investitora",
          type: "text",
          required: true
        },
        {
          id: "contactPerson",
          label: "Kontakt osoba",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        },
        {
          id: "attachments",
          label: "Urbanistički uslovi / postojeća dokumentacija",
          type: "file",
          required: false
        }
      ]
    }
  ],
  commercial: [
    {
      id: "commercial-basic",
      title: "Poslovni objekat – osnovne informacije",
      fields: [
        {
          id: "location",
          label: "Lokacija",
          type: "text",
          required: true
        },
        {
          id: "program",
          label: "Vrsta poslovnog objekta",
          type: "select",
          required: true,
          options: [
            { value: "office", label: "Kancelarije" },
            { value: "retail", label: "Maloprodaja" },
            { value: "mixed", label: "Mješovita namjena" }
          ]
        },
        {
          id: "area",
          label: "Površina (m²)",
          type: "number",
          required: true,
          validation: { min: 50, max: 5000 }
        }
      ]
    },
    {
      id: "commercial-contact",
      title: "Kontakt i detalji",
      fields: [
        {
          id: "company",
          label: "Naziv firme",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        },
        {
          id: "notes",
          label: "Dodatne informacije",
          type: "textarea",
          required: false
        }
      ]
    }
  ],
  interior: [
    {
      id: "interior-basic",
      title: "Osnovne informacije o enterijeru",
      fields: [
        {
          id: "spaceType",
          label: "Tip prostora",
          type: "select",
          required: true,
          options: [
            { value: "apartment", label: "Stan" },
            { value: "house", label: "Kuća" },
            { value: "office", label: "Kancelarija" },
            { value: "retail", label: "Prodajni prostor" }
          ]
        },
        {
          id: "area",
          label: "Površina (m²)",
          type: "number",
          required: true,
          validation: { min: 20, max: 1000 }
        },
        {
          id: "style",
          label: "Željeni stil",
          type: "text",
          required: false,
          placeholder: "Npr. minimalizam, skandinavski, industrijski..."
        }
      ]
    },
    {
      id: "interior-scope",
      title: "Obim usluge enterijera",
      fields: [
        {
          id: "services",
          label: "Izaberite usluge",
          type: "checkbox",
          required: true,
          options: [
            { value: "concept", label: "Idejni koncept" },
            { value: "technical", label: "Tehnička razrada" },
            { value: "3d", label: "3D vizualizacije" }
          ]
        },
        {
          id: "attachments",
          label: "Tlocrt / postojeće stanje",
          type: "file",
          required: false
        }
      ]
    },
    {
      id: "interior-contact",
      title: "Kontakt podaci",
      fields: [
        {
          id: "fullName",
          label: "Ime i prezime",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        },
        {
          id: "phone",
          label: "Telefon",
          type: "text",
          required: false
        }
      ]
    }
  ],
  reconstruction: [
    {
      id: "reconstruction-basic",
      title: "Informacije o postojećem objektu",
      fields: [
        {
          id: "year",
          label: "Godina izgradnje (približno)",
          type: "number",
          required: false,
          validation: { min: 1900, max: new Date().getFullYear() }
        },
        {
          id: "scope",
          label: "Obim rekonstrukcije",
          type: "select",
          required: true,
          options: [
            { value: "partial", label: "Djelimična rekonstrukcija" },
            { value: "complete", label: "Potpuna rekonstrukcija" }
          ]
        },
        {
          id: "goals",
          label: "Glavni ciljevi",
          type: "textarea",
          required: true,
          placeholder: "Npr. energetska efikasnost, proširenje, funkcionalnost..."
        }
      ]
    },
    {
      id: "reconstruction-contact",
      title: "Kontakt podaci",
      fields: [
        {
          id: "fullName",
          label: "Ime i prezime",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        }
      ]
    }
  ],
  visualization: [
    {
      id: "visualization-basic",
      title: "3D vizualizacija – osnovne informacije",
      fields: [
        {
          id: "projectStatus",
          label: "Status projekta",
          type: "radio",
          required: true,
          options: [
            { value: "have-model", label: "Imam gotov 3D model" },
            { value: "need-model", label: "Treba izraditi model" }
          ]
        },
        {
          id: "views",
          label: "Broj željenih prikaza",
          type: "number",
          required: true,
          validation: { min: 1, max: 20 }
        },
        {
          id: "attachments",
          label: "Referentne slike / nacrti",
          type: "file",
          required: false
        }
      ]
    },
    {
      id: "visualization-contact",
      title: "Kontakt podaci",
      fields: [
        {
          id: "fullName",
          label: "Ime i prezime",
          type: "text",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        }
      ]
    }
  ]
};

