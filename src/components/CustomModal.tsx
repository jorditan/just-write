import { FC } from "react"

interface Props {
  buttonText?: string;
  buttonType?: "primary" | "secondary" | "outline";
  modalTitle: string;
  modalContent: string;
  video?: string;
  videoAlt?: string;
}

export const CustomModal: FC<Props> = ({ buttonText, buttonType, modalTitle, modalContent, video, videoAlt }) => {
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className={`btn btn-${buttonType}`} onClick={() => document.getElementById('my_modal_3').showModal()}>{buttonText}</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">{modalTitle}</h3>
          <p className="py-4">{modalContent}</p>
          <img className="w-full object-cover rounded-md" src={video} alt={videoAlt} />
        </div>
      </dialog>
    </div>
  )
}
