import {useContext, useEffect, useState} from "react";
import {ServiceContext} from "../../context/ServiceContext.jsx";
import {useDispatch} from "react-redux";
import {diseaseAction} from "../../slices/diseaseSlice.js";
import {symptomsAction} from "../../slices/symptomsSlice.js";
import {ruleAction} from "../../slices/ruleSlice.js";
import {userAction} from "../../slices/userSlice.js";
import {diagnoseAction} from "../../slices/diagnoseSlice.js";

const Dashboard = () => {
    const {
        authService,
        diseaseService,
        symptomsService,
        ruleService,
        diagnosisService
    } = useContext(ServiceContext);
    const dispatch = useDispatch();
    const [diseasesSize, setDiseasesSize ] = useState(0);
    const [symptomsSize, setSymptomsSize ] = useState(0);
    const [rulesSize, setRulesSize ] = useState(0);
    const [usersSize, setUsersSize ] = useState(0);
    const [diagnonsesSize, setDiagnonsesSize ] = useState(0);

    useEffect(() => {
        const onGetData = () => {
            dispatch(diseaseAction(async () => {
                const result = await diseaseService.getAll();
                setDiseasesSize(result.paging.totalElements);
                return result;
            }));
            dispatch(symptomsAction(async () => {
                const result = await symptomsService.getAll();
                setSymptomsSize(result.paging.totalElements);
                return result;
            }));
            dispatch(ruleAction(async () => {
                const result = await ruleService.getAll();
                setRulesSize(result.paging.totalElements)
                return result
            }));
            dispatch(userAction(async () => {
                const result = await authService.getAll()
                setUsersSize(result.paging.totalElements)
                return result;
            }));
            dispatch(diagnoseAction(async () => {
                const result = await diagnosisService.getAll()
                setDiagnonsesSize(result.paging.totalElements);
                return result;
            }));
        }
        onGetData();
    }, [authService, diagnosisService, diseaseService, dispatch, ruleService, symptomsService]);

    return (
        <div>
            <div className="grey-bg container-fluid">
                <section id="minimal-statistics">
                    <div className="row">
                        <div className="col-12 mt-3 mb-1">
                            <h4 className="text-uppercase">Dashboard</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <i className="bi bi-person fs-1 text-primary"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>{usersSize}</h3>
                                                <span>Total Pengguna</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <i className="bi bi-virus fs-1 text-primary"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>{diseasesSize}</h3>
                                                <span>Total Data Penyakit</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <i className="bi bi-person-check fs-1 text-primary"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>{symptomsSize}</h3>
                                                <span>Total Data Gejala</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card shadow">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <i className="bi bi-file-ruled fs-1 text-primary"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>{rulesSize}</h3>
                                                <span>Total Basis Pengetahuan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12 mt-4">
                            <div className="card shadow">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <i className="bi bi-file-medical fs-1 text-primary"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>{diagnonsesSize}</h3>
                                                <span>Total Diagnosa</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
