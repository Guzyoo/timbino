interface UserData {
  uid: string; // Tambahkan ini
  email: string;
  namaBayi?: string;
  tanggalLahir?: string;
  jenisKelamin?: string;
  ibuKandung?: string;
  usia?: number;
  alamat?: string;
  records: {
    date: string;
    sensorData: {
      BMI: number;
      berat: number;
      tinggi: number;
      status: number;
    };
  }[];
}

export type RootParamList = {
  SplashScreen: undefined;
  Login: undefined;
  Daftar: undefined;
  Admin: undefined;
  Home: undefined;
  MenuTimbang: undefined;
  PanduanBayi: undefined;
  Calendar: undefined;
  DashboardUser: undefined;
  DashboardAdminScreen: undefined;
  ProfileUser: undefined;
  BeratBadan: undefined;
  TinggiBadan: undefined;
  Resep6: undefined;
  Resep13: undefined;
  Mpasi: undefined;
  OnBoarding: undefined;
  TimbanganBayi: undefined;
  KelolaAkunScreen: undefined;
  PanduanTumbuh: undefined;
  ResepMakanan: undefined;
  MakananSehat: undefined;
  DataManual: undefined;
  DetailAkun: {userData: UserData};
};
