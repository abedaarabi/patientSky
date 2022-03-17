export interface PatientTypes {
  name: string;
  email: string;
  birthday: string;
  phoneNumber: string;
  id?: string | number;
  medicineList?: Medicine[];
}


export interface InitialState {
  patient: {
    patients: Record<string, PatientTypes>;
    searchKey: string;
    ids: string[];
  };
}

export interface Medicine {
  id: string;
  nameFormStrength: string;
}

export interface MedicineSlice {
  medicineTypes: Medicine[];
  searchKey: string;
}

export interface MedicineInitialState {
  medicine: {
    medicineTypes: Medicine[];
    searchKey: string;
    assignedMedicine: {};
  };
}

export interface ButtonInterface {
  children: string | any;
  link?: string | any;
  onClick?: () => void;
  type?: string;
}
export interface NavbarInterface {
  btnTitle: string;
  link?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  type?: string;
}
