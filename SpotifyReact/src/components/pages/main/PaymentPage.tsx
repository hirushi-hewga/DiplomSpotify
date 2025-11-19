import { Input } from "@headlessui/react";
import { Button } from "components/ui/Button";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export enum SubscriptionPlan {
  INDIVIDUAL = "INDIVIDUAL",
  STUDENT = "STUDENT",
  FAMILY = "FAMILY",
  DUO = "DUO",
  BUSINESS = "BUSINESS"
}

const PaymentPage: React.FC = () => {

  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [date, setDate] = React.useState("");
  const [code, setCode] = React.useState("");


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedPlan = params.get("plan") as SubscriptionPlan;

  const login = async () => {

  }

  return (
      <div className="w-full flex flex-col items-center">
        <h3 className="text-white text-4xl font-semibold font-montserrat mt-[58px]">
          Make a payment
        </h3>
        <span className="text-[#BCBCBC] text-2xl font-normal font-roboto mt-[10px]">
          Use a payment card
        </span>
        <div className="w-[600px] bg-black rounded-[14px] shadow-[0_0_10px_0px_#F41A30] mt-[45px] mb-[145px]">
          <div className="bg-gradient-to-r from-[#59072F] to-[#DA0833] rounded-t-[14px] shadow-[0_0_10px_0px_#F41A30] p-4">
            <h4 className="text-white text-3xl font-bold font-montserrat text-center">
              {selectedPlan} SUBSCRIPTION
            </h4>
          </div>
          <form className="w-full px-[74px] mt-[45px] mb-[70px] flex flex-col">
            <span className="font-roboto font-normal text-xl text-white">Enter the data:</span>
            <div className="flex flex-row mt-[29px]">
              <img src="assets/payment/visa.png" alt="visa" className="mr-[26px] h-[40px]"/>
              <img src="assets/payment/amex.png" alt="amex" className="mr-[26px] h-[40px]"/>
              <img src="assets/payment/mastercard.png" alt="mastercard" className="mr-[26px] h-[40px]"/>
              <img src="assets/payment/paypal.png" alt="paypal" className="mr-[26px] h-[40px]"/>
              <img src="assets/payment/discover.png" alt="discover" className="mr-[26px] h-[40px]"/>
            </div>
            <Input
              className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none mt-[49px] font-roboto text-xl px-[18px] py-[12px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id={"name"}
              type="text"
              placeholder="Full Name"
            />
            <Input
              className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none mt-[17px] font-roboto text-xl px-[18px] py-[12px]"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              id={"number"}
              type="text"
              placeholder="Card number"
            />
            <span className="font-roboto font-normal text-xl text-white mt-[39px]">Valid until:</span>
            <div className="flex flex-row mt-[16px] justify-between">
              <Input
                className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none font-roboto text-xl px-[18px] py-[12px] w-[216px]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id={"date"}
                type="text"
                placeholder="MM/YY"
              />
              <Input
                className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none font-roboto text-xl px-[18px] py-[12px] w-[216px]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                id={"code"}
                type="text"
                placeholder="Code"
              />
            </div>
            <div className="flex flex-col items-center">
              <NavLink to="/premium" className={"mt-[27px] "}>
                <span className="font-roboto font-normal text-xl text-[#BCBCBC] hover:text-loginTextColor2">Change the plan</span>
              </NavLink>
              <Button
                type="submit"
                variant="primary"
                className=" bg-gradient-to-r from-[#59072F] to-[#DA0833] hover:bg-none flex justify-center items-center w-2/3 mt-[28px]">
                  <span className="font-roboto font-semibold text-white text-xl">Pay now</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default PaymentPage;