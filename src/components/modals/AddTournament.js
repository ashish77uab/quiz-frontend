import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import { addTournament, updateTournament } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import TextArea from "../forms/TextArea";
import { colorsOptions } from "../../utils/constants";
import FileUpload from "../forms/FileUpload";
import { imageRender } from "../../utils/helpers";
const initialState = {
  name: "",
  color: colorsOptions[0],
  icon: "",
};
const AddTournament = ({ isOpen, closeModal, tournament }) => {
  const [loading,setLoading] = useState(false)
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
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
    const formData = new FormData();

    if (tournament) {
      if (image) {
        for (const [key, value] of Object.entries(form)) {
          formData.append(key, value);
        }
        formData.append("icon", image[0]);
      } else {
      }
    } else {
      for (const [key, value] of Object.entries(form)) {
        formData.append(key, value);
      }
      formData.append("icon", image[0]);
    }
    try {
      const res = tournament
        ? await updateTournament(
            tournament._id,
            tournament && image ? formData : form
          )
        : await addTournament(formData);
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
    if (tournament) {
      setForm({
        name: tournament.name,
        color: tournament.color,
        icon: tournament.icon,
      });
    }
  }, [tournament]);

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
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Add Tournament
                </Dialog.Title>
                <div className="mt-2">
                  <div className=" w-full">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                      <TextInput
                        name="name"
                        label={"Name of the tournament"}
                        placeholder="Enter name"
                        value={form.name}
                        onChange={handleChange}
                      />
                      <div className="flex flex-col gap-1">
                        <label htmlFor="">Choose color</label>
                        <div className="flex gap-2 flex-wrap">
                          {colorsOptions.map((color) => (
                            <div
                              onClick={() => setForm({ ...form, color })}
                              className={`w-6 cursor-pointer h-6 rounded-full border flex-center flex-shrink-0 p-[2px] `}
                              style={{
                                borderColor:
                                  form.color === color ? color : "transparent",
                              }}
                            >
                              <div
                                className={`w-full h-full m-1 rounded-full flex-shrink-0  `}
                                style={{ background: color }}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-1 flex flex-col gap-1">
                        <label htmlFor="">Tournament logo</label>
                        <FileUpload image={image} setImage={setImage} />
                        {tournament && !image && (
                          <div className="relative">
                            <img
                              className="w-24 h-24 object-contain"
                              src={imageRender(form.icon)}
                              alt={tournament.name}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn-primary">
                    {loading?'Loading...' :  tournament ? "Update" : "Add"}
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

export default AddTournament;
