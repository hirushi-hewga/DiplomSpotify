const AccountPage = () => {
  return (
    <div className="w-[1176px] mt-[140px] mb-[208px] flex flex-col gap-y-[40px] text-white">
      <div className="w-full h-[69px] flex items-center rounded-full backdrop-blur-[8.3px] border-[1px] border-white/[80%] bg-black/[10%]">
        <img
          src="/assets/icons/icon8.svg"
          alt="icon"
          className="w-[33.5px] h-[33.5px] ml-[32px]"
        />
        <input
          type="text"
          placeholder="Search in account or in reference articles"
          className="flex-1 mr-[12px] bg-transparent font-normal font-inter  text-[20px] text-white placeholder-[#D9D9D9] border-none focus:ring-0"
        />
      </div>
      <div className="w-full px-[36px] py-[18px] flex flex-col gap-y-[24px] rounded-[20px] bg-black/[70%]">
        <div className="font-semibold font-poppins text-[32px]">Account</div>
        <div className="w-full flex flex-col gap-y-[16px] font-normal font-inter text-[20px]">
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[21.2px]" />
              </div>
              Edit personal info
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[18px]" />
              </div>
              Recover playlists
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[36px] py-[18px] flex flex-col gap-y-[24px] rounded-[20px] bg-black/[70%]">
        <div className="font-semibold font-poppins text-[32px]">Security and privacy</div>
        <div className="w-full flex flex-col gap-y-[16px] font-normal font-inter text-[20px]">
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[21.2px]" />
              </div>
              Notification settings
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[18px]" />
              </div>
              Account privacy
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[18px]" />
              </div>
              Edit login methods
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[18px]" />
              </div>
              Set device password
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[18px]" />
              </div>
              Sign out everywhere
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[36px] py-[18px] flex flex-col gap-y-[24px] rounded-[20px] bg-black/[70%]">
        <div className="font-semibold font-poppins text-[32px]">Advertising</div>
        <div className="w-full flex flex-col gap-y-[16px] font-normal font-inter text-[20px]">
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[21.2px]" />
              </div>
              Ad preferences
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[36px] py-[18px] flex flex-col gap-y-[24px] rounded-[20px] bg-black/[70%]">
        <div className="font-semibold font-poppins text-[32px]">Advertising</div>
        <div className="w-full flex flex-col gap-y-[16px] font-normal font-inter text-[20px]">
          <div className="h-[52px] flex items-center justify-between">
            <div className="flex items-center gap-x-[12px]">
              <div className="w-[32px] h-[32px] rounded-[4px] flex items-center justify-center bg-[#444444]/[30%]">
                <img src="/assets/icons/icon19.svg" alt="icon" className="h-[21.2px]" />
              </div>
              Echo support
            </div>
            <div className="w-[25px] h-[25px] flex items-center justify-center">
              <img src="/assets/icons/icon19.svg" alt="icon" className="h-[12px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage;