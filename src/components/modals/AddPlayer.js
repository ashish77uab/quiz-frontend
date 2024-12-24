import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import {
  addPlayer,
  updatePlayer,
} from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import ReactSelect from "../forms/ReactSelect";
import { DesignationConstant, RoleConstant } from "../../utils/constants";

const AddPlayer = ({ isOpen, closeModal, player, teamId }) => {
  const [loading, setLoading] = useState(false)
  const roles = Object.values(RoleConstant)?.map((item)=>({label:item,value:item}))
  const initialState = {
    // team: '',
    name: '',
    // points: '',
    credits: '',
    // designation: '',
    role: '',
    // isPlaying: '',
    // match: '',
  };
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [select, setSelect] = useState({
    role: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleReset = () => {
    setForm(initialState);
    setImage(null);
    closeModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const tempData={
      ...form,
      team: teamId,
    }
    try {
      const res = player
        ? await updatePlayer(
          player._id,
          tempData
        )
        : await addPlayer(tempData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={`Added Successfully`} />);
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
  useEffect(() => {
    if (player) {
      setForm({
        name: player?.name|| '',
        role: player?.role|| '',
        credits: player?.credits|| '',
      });

      const selectedRole=roles?.find((item)=>item?.value===player?.role)
      setSelect({
        role: selectedRole
      })
    }
  }, [player]);


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
                  {player? 'Update' :'Add'} Player
                </Dialog.Title>
                <div className="mt-2">
                  <div className=" w-full">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                      <TextInput
                        name="name"
                        label={"Name of the player"}
                        placeholder="Enter name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <TextInput
                        name="credits"
                        label={"Credit Points"}
                        placeholder="Enter credit points"
                        value={form.credits}
                        onChange={handleChange}
                      />
                      <ReactSelect
                        label={"Choose Role"}
                        options={roles}
                        value={select?.role}
                        onChange={(e) => {
                          setForm({ ...form, role: e?.value });
                          setSelect(prev => ({ ...prev, role: e }));
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn-primary">
                    {loading ? 'Loading...' : player ? "Update" : "Add"}
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

export default AddPlayer;
