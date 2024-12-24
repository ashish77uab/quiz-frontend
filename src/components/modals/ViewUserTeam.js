import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { RoleConstant } from "../../utils/constants";

const PreviewPlayer = ({ player, team }) => {
  const isCapatin = team?.captain === player?.player || team?.captain === player?._id
  const isViceCaptain = team?.viceCaptain === player?.player || team?.viceCaptain === player?._id
  let points = player?.totalPoints
  if(isCapatin){
    points=points*2
  }else if(isViceCaptain){
    points=points*1.5
  }

  return (
    <div className=" flex flex-col text-center items-center w-20 relative ">
      {team && (
        <>
          {isCapatin && <div className="absolute top-[-10px] right-[-6px] w-6 h-6 rounded-full flex-center bg-black text-white text-xs font-semibold">
            <div> C</div>
          </div>}
          {isViceCaptain && <div className="absolute top-[-10px] right-[-6px] w-6 h-6 rounded-full flex-center bg-black text-white text-xs font-semibold">
            <div>VC</div>
          </div>}

        </>
      )}
      <img className="w-10 h-10 object-cover mr-1" src={player.image || '/images/user.png'} alt="user" />
      <div>
        <p className="text-[12px] line-clamp-1 bg-black p-1 text-white rounded-sm">{player.name}</p>
        <div className="text-sm text-white font-semibold">{player?.totalPoints||0} cr</div>
      </div>
    </div>
  )
}

const ViewUserTeam = ({ isOpen, closeModal, item, user }) => {

  const handleReset = () => {
    closeModal();
  };

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
                className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  {user?.fullName}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="space-y-4 p-6 min-h-[440px] rounded-md bg-green-700 my-4 relative">
                    <div className="flex justify-center gap-4 flex-wrap">
                      {item?.players?.filter((player) => player.role === RoleConstant?.WicketKeeper)?.map((player, index) => (
                        <PreviewPlayer team={item} key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 flex-wrap">
                      {item?.players?.filter((player) => player.role === RoleConstant?.Batsman)?.map((player, index) => (
                        <PreviewPlayer team={item} key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 flex-wrap">
                      {item?.players?.filter((player) => player.role === RoleConstant?.AllRounder)?.map((player, index) => (
                        <PreviewPlayer team={item} key={index} player={player} />
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 flex-wrap">
                      {item?.players?.filter((player) => player.role === RoleConstant?.Bowler)?.map((player, index) => (
                        <PreviewPlayer team={item} key={index} player={player} />
                      ))}
                    </div>
                  </div>
                </div>



              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewUserTeam;
