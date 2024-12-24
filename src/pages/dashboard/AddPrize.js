import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import {
    createPrizePyramid,
    updtePrizePyramid,
    getPrizePyramid
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
const initialState = {
    winningAmount: '',
    winningPercentage: '',
    entryFees: '',
    distributionPyramid: [{
        rank: 0,
        prize: 0,
    }],
    rangePyramid: [{
        first: 0,
        last: 0,
        prize: 0,
    }],

};
const AddPrize = () => {
    const { prizeId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [form, setForm] = useState(initialState);

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = prizeId ? await updtePrizePyramid(prizeId, values) : await createPrizePyramid(values);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`${prizeId ? 'Updated' : 'Added'} Successfully`} />);
                // handleReset();
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
    const getSinglePrizePyramid = async (id) => {
        try {
            const res = await getPrizePyramid(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setForm({
                    winningAmount: data?.winningAmount,
                    winningPercentage: data?.winningPercentage,
                    entryFees: data?.entryFees,
                    distributionPyramid: data?.distributionPyramid,
                    rangePyramid: data?.rangePyramid,
                });
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };


    useEffect(() => {
        if (prizeId) {
            getSinglePrizePyramid(prizeId);
        }
    }, [prizeId]);


    return (
        <div className="py-10 px-4">
            <Formik
                enableReinitialize
                initialValues={form}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => {
                    console.log(values, 'values')
                    return (
                        <Form>
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    name="entryFees"
                                    type="number"
                                    label={"Entry fees"}
                                    placeholder="Enter Entry Fee amount"
                                    value={values?.entryFees}
                                    onChange={handleChange}
                                />
                                <TextInput
                                    name="winningAmount"
                                    type="number"
                                    label={"Entry winning Amount"}
                                    placeholder="Enter winning Amount"
                                    value={values?.winningAmount}
                                    onChange={handleChange}
                                />

                                <TextInput
                                    name="winningPercentage"
                                    type="number"
                                    max={100}
                                    label={"Winning distributed Percentage"}
                                    placeholder="Enter winning distributed Percentage"
                                    value={values?.winningPercentage}
                                    onChange={handleChange}
                                />

                                <div className="col-span-2">
                                    <label className="font-semibold py-2 block " htmlFor="">Top 3 Rank Prizes</label>
                                    <FieldArray name="distributionPyramid">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values?.distributionPyramid?.length > 0 &&
                                                    values?.distributionPyramid?.map((distribution, index) => (
                                                        <div className="row flex gap-4" key={index}>
                                                            <div className="col flex-1">
                                                                <TextInput
                                                                    label={'Rank'}
                                                                    name={`distributionPyramid.${index}.rank`}
                                                                    placeholder="eg. 4"
                                                                    type="number"
                                                                    onChange={handleChange}
                                                                    value={distribution.rank}
                                                                />
                                                                <ErrorMessage
                                                                    name={`distributionPyramid.${index}.rank`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="col flex-1">
                                                                <TextInput
                                                                    label={'Prize'}
                                                                    name={`distributionPyramid.${index}.prize`}
                                                                    placeholder="eg. 100000"
                                                                    type="number"
                                                                    onChange={handleChange}
                                                                    value={distribution.prize}
                                                                />
                                                                <ErrorMessage
                                                                    name={`distributionPyramid.${index}.prize`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="col flex items-center gap-2 ">
                                                                <DeleteButton
                                                                    type='button'
                                                                    className={'text-xl'}
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    {reactIcons.minus}
                                                                </DeleteButton>
                                                                <ActionButton
                                                                    type='button'
                                                                    className={'text-xl'}
                                                                    onClick={() => push({
                                                                        rank: 0,
                                                                        prize: 0,
                                                                    })}
                                                                >
                                                                    {reactIcons.plus}
                                                                </ActionButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => push({ name: '', email: '' })}
                                                >
                                                    Add Friend
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                                <div className="col-span-2">
                                    <label className="font-semibold py-2 block " htmlFor="">Range Rank Prizes</label>
                                    <FieldArray name="rangePyramid">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values?.rangePyramid?.length > 0 &&
                                                    values?.rangePyramid?.map((range, index) => (
                                                        <div className="row flex gap-4" key={index}>
                                                            <div className="col flex-1">
                                                                <TextInput
                                                                    label={'First'}
                                                                    name={`rangePyramid.${index}.first`}
                                                                    placeholder="eg. 11"
                                                                    type="number"
                                                                    onChange={handleChange}
                                                                    value={range.first}
                                                                />
                                                                <ErrorMessage
                                                                    name={`rangePyramid.${index}.first`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="col flex-1">
                                                                <TextInput
                                                                    label={'End'}
                                                                    name={`rangePyramid.${index}.last`}
                                                                    placeholder="eg. 100"
                                                                    type="number"
                                                                    onChange={handleChange}
                                                                    value={range.last}
                                                                />
                                                                <ErrorMessage
                                                                    name={`rangePyramid.${index}.last`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="col flex-1">
                                                                <TextInput
                                                                    label={'Prize'}
                                                                    name={`rangePyramid.${index}.prize`}
                                                                    placeholder="eg. 100000"
                                                                    type="number"
                                                                    onChange={handleChange}
                                                                    value={range.prize}
                                                                />
                                                                <ErrorMessage
                                                                    name={`rangePyramid.${index}.prize`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="col flex items-center gap-2 ">
                                                                <DeleteButton
                                                                    type='button'
                                                                    className={'text-xl'}
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    {reactIcons.minus}
                                                                </DeleteButton>
                                                                <ActionButton
                                                                    type='button'
                                                                    className={'text-xl'}
                                                                    onClick={() => push({
                                                                        rank: 0,
                                                                        prize: 0,
                                                                    })}
                                                                >
                                                                    {reactIcons.plus}
                                                                </ActionButton>
                                                            </div>
                                                        </div>
                                                    ))}

                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </div>
                            <button className="btn-primary mt-4" type="submit">{prizeId ? 'Update' : 'Create'}</button>
                        </Form>
                    )
                }}
            </Formik>

        </div>
    );
};

export default AddPrize;
