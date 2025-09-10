import { useModalStore } from '@/lib/store';
import Image from 'next/image';
import moment from 'moment';

export default function ViewEventModal() {
  // Hooks

  const modalStore = useModalStore();

  if (typeof modalStore.viewEvent == 'object')
    return (
      <div
        onClick={() => modalStore.closeModal('viewEvent')}
        className="opacity-0 animate-fade-in fixed h-screen w-screen top-0 left-0 bg-black/50 backdrop-blur-sm transition duration-200 ease-in flex items-center justify-center z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-auto px-10 pt-5 border mt-4 border-white  max-w-md flex relative bg-white rounded-lg shadow-lg w-120 h-fit flex-col"
        >
          <h1 className="absolute top-3 left-4 text-xl">Event Information:</h1>
          <div className="py-10 px-5">
            <p>
              Event:{' '}
              <span className="font-bold ml-2">
                {modalStore.viewEvent.event_name}
              </span>
            </p>
            <p>
              Location:{' '}
              <span className="font-bold ml-2">
                {modalStore.viewEvent.event_location}
              </span>
            </p>
            <p>
              Date:{' '}
              <span className="font-bold ml-2">
                {moment(modalStore.viewEvent.event_date).calendar()}
              </span>
            </p>
            <p>
              Host:{' '}
              <span className="font-bold ml-2">
                {modalStore.viewEvent.host}
              </span>
            </p>
          </div>
          <Image
            src="/x.svg"
            alt="Close"
            width={24}
            height={24}
            className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300 text-xs"
            onClick={() => modalStore.closeModal('viewEvent')}
          />
        </div>
      </div>
    );
}
