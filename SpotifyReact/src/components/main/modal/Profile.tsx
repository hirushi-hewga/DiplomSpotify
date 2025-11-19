import { Button, Input } from '@headlessui/react';
import React from 'react';
import { useEffect, useRef } from "react";
import { API_URL } from 'utils/envData';
import Image from '../icon/Image';
import { userApi } from 'services/user';
import { UpdateUser } from 'interfaces/user';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Profile: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = React.useState<string | undefined>("");
  const [image, setImage] = React.useState<File | undefined>(undefined);
  const [preview, setPreview] = React.useState<string | undefined>(undefined);

  const imageSrc = API_URL + "/images/800_";
  const modalRef = useRef<HTMLDivElement>(null);
  const user = userApi.useGetInfoQuery().data;
  const [updateUser] = userApi.useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setUsername(user.userName);
      setPreview(imageSrc + user.photo);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const updateUserHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { username: username, image: image }
      await updateUser(data);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
      <div 
        className="bg-black py-[60px] px-[45px] relative rounded-[16px] flex flex-col items-center justify-center"
        ref={modalRef} 
        style={{ boxShadow: '0px 0px 10px 0px #F41A30B2' }}>

          <form className='flex flex-col items-center' onSubmit={updateUserHandler}>

            <div className='relative flex items-center justify-center group'>
              <img src={preview} alt={user?.userName} className='w-[185px] h-[185px] object-cover rounded-full'/>
              <Button className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500">
                <label htmlFor="image-upload">
                  <Image className="w-[70px] h-[70px] cursor-pointer" />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Button>
            </div>

            <Input
              className="bg-loginEditTextBg mt-[46px] text-white w-[258px] text-center h-[55px] font-montserrat font-extrabold text-2xl focus:border-none rounded-lg focus:ring-0 border-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id={"email"}
              type="name"
              placeholder="Username"
              required/>

            <button type="submit" className="my-[28px] w-[165px] h-[54px] rounded-[6px] bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex justify-center items-center">
              <span className="font-roboto font-semibold text-2xl text-white">Save</span>
            </button>
          </form>
          <div className='font-roboto font-normal text-xs text-white text-center'>
            <span>By continuing, you agree to grant MusicFlow access to the selected image.</span>
            <br/>
            <span> Make sure you have the right to use it.</span>
          </div>
      </div>
    </div>
  );
};

export default Profile;
