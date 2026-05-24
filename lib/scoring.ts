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

  const equityVulnerabilityScore = clamp(
    area.lowIncomeHouseholdPercent * 1.4 + area.seniorPopulationPercent * 1.2
  );

  const sustainabilityOpportunityScore = clamp(
    (10 - area.evChargerAccessScore) * 4 +
      area.solarPotentialScore * 5 +
      (10 - area.coolingCentreAccessScore) * 3
  );
  const gridModernizationNeedScore = clamp(
    area.buildingAgeScore * 5 + area.outageCount * 6 + programAccessGapScore * 0.2
  );
  const overallPriorityScore = clamp(
    energyBurdenScore * 0.2 +
      outageRiskScore * 0.15 +
      heatVulnerabilityScore * 0.15 +
      buildingEfficiencyRiskScore * 0.1 +
      programAccessGapScore * 0.12 +
      equityVulnerabilityScore * 0.1 +
      sustainabilityOpportunityScore * 0.08 +
      gridModernizationNeedScore * 0.1
  );

  return {
    energyBurdenPercent: Number(energyBurdenPercent.toFixed(2)),
    energyBurdenScore,
    outageRiskScore,
    heatVulnerabilityScore,
    buildingEfficiencyRiskScore,
    programAccessGapScore,
    equityVulnerabilityScore,
    sustainabilityOpportunityScore,
    overallPriorityScore,
    gridModernizationNeedScore,
  };
}

export function getPriorityLabel(score: number) {
  if (score >= 75) return "High Priority";
  if (score >= 50) return "Medium Priority";
  return "Monitor";
}

export function getRecommendation(area: Neighbourhood, score: number) {
  if (score >= 75) {
    return `${area.name} should be prioritized for targeted bill support, energy-efficiency outreach, cooling resilience, and a grid reliability review.`;
  }

  if (score >= 50) {
    return `${area.name} should receive expanded program awareness, efficiency rebate outreach, and monitoring for outage or heat-related risks.`;
  }

  return `${area.name} should continue receiving regular support while tracking energy costs, outage patterns, and sustainability opportunities over time.`;
}

export function getPartnerActions(area: Neighbourhood, score: number) {
  if (score >= 75) {
    return [
      "Alectra: prioritize grid reliability review and customer affordability outreach.",
      "Estri: support community energy planning, sustainability mapping, and local engagement.",
      "Municipality: expand cooling-centre awareness and retrofit program promotion.",
      "Community partners: host local workshops explaining rebates and energy-saving options.",
    ];
  }

  if (score >= 50) {
    return [
      "Alectra: promote available conservation and affordability programs.",
      "Estri: identify sustainability opportunities using neighbourhood-level data.",
      "Municipality: monitor heat-risk and building-efficiency concerns.",
    ];
  }

  return [
    "Continue regular energy support.",
    "Track changes in energy burden, outage frequency, and program access.",
    "Use this area as a comparison benchmark for higher-risk neighbourhoods.",
  ];
}