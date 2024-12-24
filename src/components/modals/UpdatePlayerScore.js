import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  updatePlayerScore,
  getPlayerScore,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
const Label={
  run: 'Runs',
  wicket: 'Wickets',
  catch: 'Catches',
  stumping: 'Stumpings',
  runOut: 'Run Outs',
}
const UpdatePlayerScore = ({ isOpen, closeModal, playerId }) => {
  const [loading, setLoading] = useState(false)
  const [scoreId, setScoreId] = useState(null)
  const initialState = {
    run: '',
    wicket: '',
    catch: '',
    stumping: '',
    runOut: '',
  };
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleReset = () => {
    setForm(initialState);
    closeModal();
    setScoreId(null)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await updatePlayerScore(scoreId, form);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Updated Successfully`} />);
        handleReset();
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
  const getPlayerScoreData = async (playerId) => {
    setLoading(true)
    try {
      const res = await getPlayerScore(playerId);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setForm({
          run: data.run,
          wicket: data.wicket,
          catch: data.catch,
          stumping: data.stumping,
          runOut: data.runOut,
        })
        setScoreId(data?._id)
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
  useEffect(() => {
    if (playerId) {
      getPlayerScoreData(playerId);
    }
  }, [playerId]);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleReset}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                onSubmit={handleSubmit}
                as="form"
                className="w-full max-w-xl min-h-[500px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Update Player Score
                </Dialog.Title>
                <div className="mt-2">
                  <div className=" w-full">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                      {
                        Object.keys(form)?.map((name) => {
                          return (
                            <TextInput
                              type='number'
                              key={name}
                              name={name}
                              label={Label[name]}
                              placeholder={`Enter ${Label[name]}`}
                              value={form[name]}
                              onChange={handleChange}
                            />
                          )
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn-primary">
                    Submit
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdatePlayerScore;
