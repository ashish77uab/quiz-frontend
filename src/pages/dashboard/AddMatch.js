import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import ReactSelect from "../../components/forms/ReactSelect";
import { getAllTeam, getMatch, addMatch, updateMatch, getTournaments, getAllPrizePyramid } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const initialState = {
    home: '',
    away: '',
    time: '',
    tournament: '',
    location: 'India',
    toss: 'Pending',
    isTop: false,
    prize:''
};
const AddMatch = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [tournaments, setTournaments] = useState([]);
    const [prizes, setPrizes] = useState([]);
    const [select, setSelect] = useState({
        home: '',
        away: '',
        tournament: '',
        prize:''
    });
    const [teams, setTeams] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleReset = () => {
        setForm(initialState);
    };
    const areFieldsNotEmpty = (state) => {
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                const value = state[key];

                // Check if the value is empty, ignoring isTop since it's boolean
                if (key !== 'isTop' && value === "") {
                    return false;  // Return false if any field is empty
                }
            }
        }
        return true; // All fields are non-empty
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = areFieldsNotEmpty(form);
        if (!isValid) {
            toast.error(<ToastMsg title="Please fill all required fields" />);
            return;
        }
        setLoading(true)
        const tempForm = { ...form, time: new Date(form?.time).toISOString() }
        try {
            const res = matchId ? await updateMatch(matchId, form) : await addMatch(form);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`${matchId ? 'Updated' : 'Added'} Successfully`} />);
                handleReset();
                navigate(-1);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error, "error");
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setLoading(false)
        }
    };
    const getAllPrizeList = async () => {
        setFetchLoading(true)
        try {
            const res = await getAllPrizePyramid();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setPrizes(data?.map((item) => ({ label: item?.winningAmount, value: item?._id })));
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setFetchLoading(false)
        }
    };
    useEffect(() => {
        getAllPrizeList();
    }, []);
    const getAllTournaments = async () => {
        setFetchLoading(true)
        try {
            const res = await getTournaments();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setTournaments(data?.map((item) => ({ label: item?.name, value: item?._id })));
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setFetchLoading(false)
        }
    };
    const getAllTeamsData = async (tournamentId) => {
        setFetchLoading(true)
        try {
            const res = await getAllTeam({ id: tournamentId });
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setTeams(data?.map((item) => ({ label: item?.name, value: item?._id })));
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setFetchLoading(false)
        }
    };
    const getSingleMatch = async (id) => {
        try {
            const res = await getMatch(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setForm({
                    home: data?.home?._id,
                    away: data?.away?._id,
                    time: moment(data?.time)?.format('YYYY-MM-DDTHH:mm'),
                    tournament: data?.tournament,
                    location: data?.location,
                    toss: data?.toss,
                    isTop: data?.isTop,
                    prize:data?.prize?._id
                });
                getAllTeamsData(data?.tournament)
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    useEffect(() => {
        getAllTournaments();
    }, []);

    useEffect(() => {
        if (matchId) {
            getSingleMatch(matchId);
        }
    }, [matchId]);
    useEffect(() => {
        if (tournaments && teams && form && prizes) {
            const home = teams?.find(item=>(item?.value === form?.home))
            const away = teams?.find(item=>(item?.value === form?.away))
            const tournament = tournaments?.find(item=>(item?.value === form?.tournament))
            const prize = prizes?.find(item => (item?.value === form?.prize))
            setSelect({
                home,
                away,
                tournament,
                prize
            });




        }

    }, [matchId, tournaments, teams, form]);

console.log(form,'form')
    return (
        <div className="py-10 px-4">
            <form
                onSubmit={handleSubmit}
                action=" "
                className="max-w-5xl mx-auto"
            >
                <div className="grid grid-cols-2 gap-6">
                    <ReactSelect
                        label={"Choose Tournaments"}
                        options={tournaments}
                        value={select?.tournament}
                        onChange={(e) => {
                            setForm({ ...form, tournament: e?.value });
                            setSelect(prev => ({ ...prev, tournament: e }));
                            getAllTeamsData(e?.value)
                        }}
                    />
                    <ReactSelect
                        label={"Prize Distribution"}
                        options={prizes}
                        value={select?.prize}
                        onChange={(e) => {
                            setForm({ ...form, prize: e?.value });
                            setSelect(prev => ({ ...prev, prize: e }));
                        }}
                    />
                    <ReactSelect
                        label={"Choose Home Team"}
                        options={teams}
                        value={select?.home}
                        onChange={(e) => {
                            setForm({ ...form, home: e?.value });
                            setSelect(prev => ({ ...prev, home: e }));
                        }}
                    />
                    <ReactSelect
                        label={"Choose Away Team"}
                        options={teams}
                        value={select?.away}
                        onChange={(e) => {
                            setForm({ ...form, away: e?.value });
                            setSelect(prev => ({ ...prev, away: e }));
                        }}
                    />
                    <TextInput
                        name="time"
                        type="datetime-local"
                        label={"Select time of the match"}
                        value={form.time}
                        onChange={handleChange}
                    />
                    <div className="flex gap-2 col-span-2">
                        <label
                            htmlFor="isTop"
                            className="flex items-center gap-4"
                        >
                            <input
                                checked={form.isTop}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        isTop: e.target.checked,
                                    });
                                }}
                                className="w-5 h-5 accent-amber-500"
                                type="checkbox"
                                name=""
                                id=""
                            />
                            <span>
                                Want this match to be top Match?
                            </span>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="btn-primary">
                            {loading ? 'Loading...' : matchId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddMatch;
