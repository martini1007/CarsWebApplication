export enum FuelType {
    Petrol = 'Benzyna',
    Hybrid = 'Hybrydowy',
    Diesel = 'Diesel',
    LPG = 'LPG',
}

export enum BodyType {
    Hatchback = 'Hatchback',
    Sedan = 'Sedan',
    Kombi = 'Kombi',
    SUV = 'SUV',
    Roadster = 'Roadster',
  }

export interface Car {
    id: string;
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: FuelType;
    productionDate: string;
    carFuelConsumption: number;
    bodyType: BodyType;
}

export const getFuelTypeName = (type: number) => {
    switch (type) {
      case 0:
        return FuelType.Petrol;
      case 1:
        return FuelType.Hybrid;
      case 2:
        return FuelType.Diesel;
      case 3:
        return FuelType.LPG;
      default:
        return 'Unknown';
    }
};

export const getBodyTypeName = (type: number) =>{
    switch(type){
        case 0 :
            return BodyType.Hatchback;
        case 1:
            return BodyType.Sedan;
        case 2:
            return BodyType.Kombi;
        case 3:
            return BodyType.SUV;
        case 4:
            return BodyType.Roadster;
        default:
            return 'Unknown';
    }
};

export const getFuelTypeNumber = (type: FuelType): number => {
  switch (type) {
      case FuelType.Petrol:
          return 0;
      case FuelType.Hybrid:
          return 1;
      case FuelType.Diesel:
          return 2;
      case FuelType.LPG:
          return 3;
      default:
          return -1; 
  }
};

export const getBodyTypeNumber = (type: BodyType): number => {
  switch (type) {
      case BodyType.Hatchback:
          return 0;
      case BodyType.Sedan:
          return 1;
      case BodyType.Kombi:
          return 2;
      case BodyType.SUV:
          return 3;
      case BodyType.Roadster:
          return 4;
      default:
          return -1; // Nieznany typ nadwozia
  }
};