import AuthService from "./AuthService.js";
import DiseaseService from "./DiseaseService.js";
import SymptomsService from "./SymptomsService.js";
import RuleService from "./RuleService.js";
import DiagnosisService from "./DiagnosisService.js";

const createServiceFactory = () => ({
    authService: AuthService(),
    diseaseService: DiseaseService(),
    symptomsService: SymptomsService(),
    ruleService: RuleService(),
    diagnosisService: DiagnosisService(),
})

export default createServiceFactory;