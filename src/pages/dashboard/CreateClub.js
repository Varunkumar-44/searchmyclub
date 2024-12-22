import React from 'react';
import { IoClose } from 'react-icons/io5';
import BackBtn from '../../components/BackBtn';
import CreateClubLogic from '../../Logic/ClubsLogic/createClub.logic';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MdUpload } from 'react-icons/md';
import Loading from '../../components/Loading';
import Sidebar from '../../components/Sidebar';

function Create() {
  const {
    inputs,
    signingin,
    handleImage,
    imagePreview,
    fileRef,
    handleCreateClub,
    removeImage,
    id,
    fetchingDoc,
  } = CreateClubLogic();

  const pageTitle = id ? 'Edit Club' : 'Create Club';

  if (fetchingDoc) return <Loading />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6">
        <BackBtn to={'/dashboard/clubs'} />
        <div className="py-4">
          <h1 className="page-title">{pageTitle}</h1>
          <form
            onSubmit={handleCreateClub}
            className="flex flex-col gap-6 pt-8"
          >
            {inputs.map((input, index) => {
              return <Input {...input} key={index} />;
            })}
            <input
              ref={fileRef}
              type="file"
              onChange={handleImage}
              className="hidden"
            />
            <button
              onClick={e => {
                e?.preventDefault();
                fileRef.current.click();
              }}
              className="primary-btn self-start"
              style={{
                marginBlock: 0,
              }}
            >
              Upload Feature Image <MdUpload />
            </button>
            {imagePreview && (
              <div className="w-60 outline outline-1 outline-neutral-300 h-100 object-cover rounded-[18px] relative overflow-hidden">
                <img
                  alt="preview"
                  className="w-full"
                  src={imagePreview ?? ''}
                />
                <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 m-2 bg-neutral-400 rounded-[18px] p-1 text-white shadow-md"
                  title="Delete Image"
                >
                  <IoClose />
                </button>
              </div>
            )}
            <Button type="submit" loading={signingin} text={pageTitle} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
