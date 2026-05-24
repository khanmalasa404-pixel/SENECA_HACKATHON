import type { Neighbourhood } from "@/data/sampleNeighbourhoods";

function clamp(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function calculateEnergyScores(area: Neighbourhood) {
  const annualEnergyCost = area.avgMonthlyBill * 12;
  const energyBurdenPercent = (annualEnergyCost / area.medianIncome) * 100;

  const energyBurdenScore = clamp(energyBurdenPercent * 20);
  const outageRiskScore = clamp(area.outageCount * 12);
  const heatVulnerabilityScore = clamp(area.heatRiskScore * 10);
  const buildingEfficiencyRiskScore = clamp(area.buildingAgeScore * 10);
  const programAccessGapScore = clamp((10 - area.programAccessScore) * 10);

  const renterUpgradeGapScore = clamp(
    area.renterHouseholdPercent * 0.55 +
      area.retrofitEligibilityGapScore * 0.25 +
      area.buildingAgeScore * 5 +
      programAccessGapScore * 0.15
  );

  const equityVulnerabilityScore = clamp(
    area.lowIncomeHouseholdPercent * 1.4 + area.seniorPopulationPercent * 1.2
  );

  const sustainabilityOpportunityScore = clamp(
    (10 - area.evChargerAccessScore) * 4 +
      area.solarPotentialScore * 5 +
      (10 - area.coolingCentreAccessScore) * 3
  );

  const gridModernizationNeedScore = clamp(
    area.buildingAgeScore * 5 +
      area.outageCount * 6 +
      programAccessGapScore * 0.2
  );

  const overallPriorityScore = clamp(
    energyBurdenScore * 0.3 +
      renterUpgradeGapScore * 0.25 +
      programAccessGapScore * 0.15 +
      buildingEfficiencyRiskScore * 0.12 +
      equityVulnerabilityScore * 0.1 +
      sustainabilityOpportunityScore * 0.08
  );

  return {
    energyBurdenPercent: Number(energyBurdenPercent.toFixed(2)),
    energyBurdenScore,
    renterUpgradeGapScore,
    outageRiskScore,
    heatVulnerabilityScore,
    buildingEfficiencyRiskScore,
    programAccessGapScore,
    equityVulnerabilityScore,
    sustainabilityOpportunityScore,
    gridModernizationNeedScore,
    overallPriorityScore,
  };
}

export function getPriorityLabel(score: number) {
  if (score >= 75) return "High Priority";
  if (score >= 50) return "Medium Priority";
  return "Monitor";
}

export function getRecommendation(area: Neighbourhood, score: number) {
  if (score >= 75) {
    return `${area.name} should be prioritized for renter-focused energy affordability outreach, direct-install efficiency programs, landlord partnership opportunities, and targeted communication about bill support or conservation programs.`;
  }

  if (score >= 50) {
    return `${area.name} should receive expanded program awareness, renter-friendly conservation education, and monitoring for building efficiency and program access barriers.`;
  }

  return `${area.name} should continue receiving regular energy support while tracking energy burden, renter concentration, and access to efficiency programs over time.`;
}

export function getPartnerActions(area: Neighbourhood, score: number) {
  if (score >= 75) {
    return [
      "Utility: prioritize renter-focused energy affordability outreach.",
      "Municipality: identify older rental buildings that may need efficiency support.",
      "Housing partners: create landlord-renter retrofit partnership opportunities.",
      "Community organizations: host local workshops explaining energy-saving options and bill support.",
      "Program teams: review whether current owner-focused incentives are missing renter-heavy buildings.",
      "Mapping partners: visualize where energy burden, renter concentration, and program access gaps overlap.",
    ];
  }

  if (score >= 50) {
    return [
      "Utility: expand awareness of conservation and affordability programs.",
      "Municipality: monitor renter-heavy buildings and older housing stock.",
      "Community partners: pilot renter-friendly energy-saving education.",
      "Program teams: identify whether existing incentives are accessible to renters.",
    ];
  }

  return [
    "Continue regular energy support and program outreach.",
    "Track changes in energy burden, renter concentration, and program access.",
    "Use this area as a comparison benchmark for higher-priority neighbourhoods.",
  ];
}