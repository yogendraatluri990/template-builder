interface Address {
  Street: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
}

interface Organization {
  Id: number | null;
  Name: string;
  AsiNumber: string;
  Type: string;
  IsInternal: boolean;
}
interface ConversionRates {
  CurrencyCode: string;
  ConversionRate: number | null;
}

interface Preference {
  ShowNetCost: boolean;
  ShowSupplierInfo: boolean;
  ProfileImage: string;
  VirtualSampleSettings: string;
  CurrencyCode: string;
  CoversionRates: [ConversionRates];
}

interface Startup {
  Id: number | null;
  Code: string;
  Version: string;
  Url: string;
}
export interface Account {
  Id: number | null;
  Username: string;
  FirstName: string;
  LastName: string;
  Organization: Organization;
  Address: Address;
  Email: string;
  Preferences: Preference;
  HasConsented: boolean;
  Clipboard: {
    count: number;
  };
  StartupApplication: Startup;
  Gravatar: string;
  DefaultMarketSegment: string;
  IsAdmin: boolean;
}
