import Header from "components/main/Header.tsx";
import Footer from "components/main/Footer.tsx";

const Vacancy = () => {
  return(
    <div className="w-full bg-[#0F0F10] relative flex flex-col items-center overflow-hidden z-0">
      <Header signInTextColor="#1F100F"/>
      <div className="w-[2095px] h-[491px] mt-[167px] flex items-center justify-between">
        <div className="h-[323px] aspect-square rounded-[24px] bg-neutral-600">

        </div>
        <div className="h-[407px] aspect-square rounded-[24px] bg-neutral-600">

        </div>
        <div className="h-full aspect-square rounded-[24px] bg-neutral-600">

        </div>
        <div className="h-[407px] aspect-square rounded-[24px] bg-neutral-600">

        </div>
        <div className="h-[323px] aspect-square rounded-[24px] bg-neutral-600">

        </div>
      </div>
      <Footer className="mt-[84px]"/>
    </div>
  )
}

export default Vacancy;