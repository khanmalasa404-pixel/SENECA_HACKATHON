export type IncentiveUptakeLikelihood = "low" | "medium" | "high";

export type Neighbourhood = {
  name: string;
  city: string;

  // Existing prototype fields
  avgMonthlyBill: number;
  medianIncome: number;
  outageCount: number;
  buildingAgeScore: number;
  heatRiskScore: number;
  programAccessScore: number;
  lowIncomeHouseholdPercent: number;
  seniorPopulationPercent: number;
  evChargerAccessScore: number;
  solarPotentialScore: number;
  coolingCentreAccessScore: number;

  // Problem Statement 01 fields
  renterHouseholdPercent: number;
  ownerOccupiedPercent: number;
  retrofitEligibilityGapScore: number;

  // Real ArcGIS / Statistics Canada shelter-cost fields
  shelterBurdenPercent: number;
  renterShelterBurdenPercent: number;
  ownerShelterBurdenPercent: number;

  // Real ArcGIS / Statistics Canada population and dwelling fields
  population2021: number;
  totalPrivateDwellings2021: number;
  occupiedPrivateDwellings2021: number;
  populationChangePercent2016To2021: number;
  populationDensityPerSqKm2021: number;

  // Renter equity fields
  renterPercent: number;
  avgRentMonthly: number;
  rentBurden: number;
  buildingAge: number;
  hasLandlordUpgradeBarrier: boolean;
  renterEnergyBurden: number;
  ownerEnergyBurden: number;
  incentiveUptakeLikelihood: IncentiveUptakeLikelihood;
};

export const sampleNeighbourhoods: Neighbourhood[] = [
  {
    name: "Jane-Finch",
    city: "Toronto",
    avgMonthlyBill: 178,

    // City-level real value from ArcGIS / Statistics Canada Median Household Income 2021
    medianIncome: 110000,

    outageCount: 7,
    buildingAgeScore: 8,
    heatRiskScore: 9,
    programAccessScore: 3,
    lowIncomeHouseholdPercent: 38,
    seniorPopulationPercent: 17,
    evChargerAccessScore: 2,
    solarPotentialScore: 7,
    coolingCentreAccessScore: 3,

    // City-level real values from ArcGIS / Statistics Canada Shelter Costs 2021
    renterHouseholdPercent: 48.1,
    ownerOccupiedPercent: 51.9,
    shelterBurdenPercent: 32.2,
    renterShelterBurdenPercent: 39.5,
    ownerShelterBurdenPercent: 25.5,

    // City-level real values from ArcGIS / Statistics Canada Population and Dwelling Counts 2021
    population2021: 2794356,
    totalPrivateDwellings2021: 1253238,
    occupiedPrivateDwellings2021: 1160892,
    populationChangePercent2016To2021: 2.3,
    populationDensityPerSqKm2021: 4427.8,

    // Prototype/derived values
    retrofitEligibilityGapScore: 82,
    renterPercent: 48.1,
    avgRentMonthly: 1350,
    rentBurden: 39.5,
    buildingAge: 1971,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 39.5,
    ownerEnergyBurden: 25.5,
    incentiveUptakeLikelihood: "low",
  },
  {
    name: "Malton",
    city: "Mississauga",
    avgMonthlyBill: 165,

    // City-level real value from ArcGIS / Statistics Canada Median Household Income 2021
    medianIncome: 119000,

    outageCount: 5,
    buildingAgeScore: 7,
    heatRiskScore: 7,
    programAccessScore: 4,
    lowIncomeHouseholdPercent: 31,
    seniorPopulationPercent: 14,
    evChargerAccessScore: 3,
    solarPotentialScore: 8,
    coolingCentreAccessScore: 4,

    // City-level real values from ArcGIS / Statistics Canada Shelter Costs 2021
    renterHouseholdPercent: 29.6,
    ownerOccupiedPercent: 70.4,
    shelterBurdenPercent: 27.9,
    renterShelterBurdenPercent: 38.5,
    ownerShelterBurdenPercent: 23.4,

    // City-level real values from ArcGIS / Statistics Canada Population and Dwelling Counts 2021
    population2021: 717961,
    totalPrivateDwellings2021: 254089,
    occupiedPrivateDwellings2021: 244575,
    populationChangePercent2016To2021: -0.5,
    populationDensityPerSqKm2021: 2452.5,

    // Prototype/derived values
    retrofitEligibilityGapScore: 74,
    renterPercent: 29.6,
    avgRentMonthly: 1420,
    rentBurden: 38.5,
    buildingAge: 1975,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 38.5,
    ownerEnergyBurden: 23.4,
    incentiveUptakeLikelihood: "medium",
  },
  {
    name: "Downtown Brampton",
    city: "Brampton",
    avgMonthlyBill: 152,

    // City-level real value from ArcGIS / Statistics Canada Median Household Income 2021
    medianIncome: 122000,

    outageCount: 4,
    buildingAgeScore: 6,
    heatRiskScore: 6,
    programAccessScore: 5,
    lowIncomeHouseholdPercent: 27,
    seniorPopulationPercent: 12,
    evChargerAccessScore: 4,
    solarPotentialScore: 7,
    coolingCentreAccessScore: 5,

    // City-level real values from ArcGIS / Statistics Canada Shelter Costs 2021
    renterHouseholdPercent: 21.9,
    ownerOccupiedPercent: 78.1,
    shelterBurdenPercent: 30.9,
    renterShelterBurdenPercent: 36.7,
    ownerShelterBurdenPercent: 29.3,

    // City-level real values from ArcGIS / Statistics Canada Population and Dwelling Counts 2021
    population2021: 656480,
    totalPrivateDwellings2021: 189086,
    occupiedPrivateDwellings2021: 182472,
    populationChangePercent2016To2021: 10.6,
    populationDensityPerSqKm2021: 2469,

    // Prototype/derived values
    retrofitEligibilityGapScore: 63,
    renterPercent: 21.9,
    avgRentMonthly: 1450,
    rentBurden: 36.7,
    buildingAge: 1980,
    hasLandlordUpgradeBarrier: false,
    renterEnergyBurden: 36.7,
    ownerEnergyBurden: 29.3,
    incentiveUptakeLikelihood: "medium",
  },
  {
    name: "Rexdale",
    city: "Toronto",
    avgMonthlyBill: 171,

    // City-level real value from ArcGIS / Statistics Canada Median Household Income 2021
    medianIncome: 110000,

    outageCount: 6,
    buildingAgeScore: 8,
    heatRiskScore: 8,
    programAccessScore: 3,
    lowIncomeHouseholdPercent: 35,
    seniorPopulationPercent: 16,
    evChargerAccessScore: 2,
    solarPotentialScore: 6,
    coolingCentreAccessScore: 3,

    // City-level real values from ArcGIS / Statistics Canada Shelter Costs 2021
    renterHouseholdPercent: 48.1,
    ownerOccupiedPercent: 51.9,
    shelterBurdenPercent: 32.2,
    renterShelterBurdenPercent: 39.5,
    ownerShelterBurdenPercent: 25.5,

    // City-level real values from ArcGIS / Statistics Canada Population and Dwelling Counts 2021
    population2021: 2794356,
    totalPrivateDwellings2021: 1253238,
    occupiedPrivateDwellings2021: 1160892,
    populationChangePercent2016To2021: 2.3,
    populationDensityPerSqKm2021: 4427.8,

    // Prototype/derived values
    retrofitEligibilityGapScore: 79,
    renterPercent: 48.1,
    avgRentMonthly: 1380,
    rentBurden: 39.5,
    buildingAge: 1968,
    hasLandlordUpgradeBarrier: true,
    renterEnergyBurden: 39.5,
    ownerEnergyBurden: 25.5,
    incentiveUptakeLikelihood: "low",
  },
  {
    name: "Port Credit",
    city: "Mississauga",
    avgMonthlyBill: 139,

    // City-level real value from ArcGIS / Statistics Canada Median Household Income 2021
    medianIncome: 119000,

    outageCount: 2,
    buildingAgeScore: 4,
    heatRiskScore: 4,
    programAccessScore: 7,
    lowIncomeHouseholdPercent: 13,
    seniorPopulationPercent: 19,
    evChargerAccessScore: 7,
    solarPotentialScore: 6,
    coolingCentreAccessScore: 8,

    // City-level real values from ArcGIS / Statistics Canada Shelter Costs 2021
    renterHouseholdPercent: 29.6,
    ownerOccupiedPercent: 70.4,
    shelterBurdenPercent: 27.9,
    renterShelterBurdenPercent: 38.5,
    ownerShelterBurdenPercent: 23.4,

    // City-level real values from ArcGIS / Statistics Canada Population and Dwelling Counts 2021
    population2021: 717961,
    totalPrivateDwellings2021: 254089,
    occupiedPrivateDwellings2021: 244575,
    populationChangePercent2016To2021: -0.5,
    populationDensityPerSqKm2021: 2452.5,

    // Prototype/derived values
    retrofitEligibilityGapScore: 38,
    renterPercent: 29.6,
    avgRentMonthly: 1950,
    rentBurden: 38.5,
    buildingAge: 1988,
    hasLandlordUpgradeBarrier: false,
    renterEnergyBurden: 38.5,
    ownerEnergyBurden: 23.4,
    incentiveUptakeLikelihood: "high",
  },
];