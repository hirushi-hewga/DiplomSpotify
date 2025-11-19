import SubscriptionCard from "./SubscriptionCard";
import Table from "./table/Table";

const SubscriptionsPage = () => {
    return (
      <div className="w-full relative">
        <div className="absolute inset-0 bg-black opacity-75 z-0 rounded-l-[14px]" />
        <div className="relative z-10">
          <div className="text-center text-white">
            <h1 className="text-white text-[42px] pt-[180px] mb-[12px] p-0 font-semibold font-montserrat">
              The perfect subscription for everyone
            </h1>
            <span className="text-3xl font-roboto font-normal">
              Choose Premium and listen to music without restrictions and adverts on any device.
            </span>
            <br />
            <span className="text-3xl font-roboto font-normal mt-[12px]">
              You can cancel at any time.
            </span>
          </div>
          <div className="flex justify-center flex-wrap gap-x-14 gap-y-14 pt-[102px] p-[100px]">
            {subscriptionPlans.map((plan) => (
              <div className="justify-center flex" key={plan.name}>
                <SubscriptionCard
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  url={plan.url}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <span className="font-montserrat font-semibold text-[42px] text-white leading-[50px]">Exparience a new level</span>
            <span className="font-roboto font-normal text-[30px] text-white leading-[36px]">Choose Premium and get the most out your music listening experience.</span>
            <span className="font-roboto font-normal text-[30px] text-white leading-[36px] mb-[70px]">Cancel your subscription anytime.</span>
            <Table/>
            <span className="font-montserrat font-semibold text-[42px] text-white leading-[50px] mt-[80px]">Pay in a way that is convenient for you.</span>
            <div className="w-full flex flex-row justify-center mt-[90px] mb-[200px]">
              <img src="assets/payment/visa.png" alt="visa" className="mx-[35px]"/>
              <img src="assets/payment/amex.png" alt="amex" className="mx-[35px]"/>
              <img src="assets/payment/mastercard.png" alt="mastercard" className="mx-[35px]"/>
              <img src="assets/payment/paypal.png" alt="paypal" className="mx-[35px]"/>
              <img src="assets/payment/discover.png" alt="discover" className="mx-[35px]"/>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SubscriptionsPage;

const subscriptionPlans = [
  {
    name: "INDIVIDUAL",
    price: 4.99,
    description: ["1 premium account", "Can be cancelled at any time"],
    url: "/payment",
  },
  {
    name: "STUDENT",
    price: 2.49,
    description: ["1 verified premium account", "Discount for students who meet the conditions", "Can be cancelled at any time"],
    url: "/payment",
  },
  {
    name: "FAMILY",
    price: 7.99,
    description: ["Up to 6 premium accounts", "Control content with age restrictions", "Can be cancelled at any time"],
    url: "/payment",
  },
  {
    name: "DUO",
    price: 6.49,
    description: ["2 premium accounts", "You can say anytime"],
    url: "/payment",
  },
  {
    name: "BUSINESS PLAN",
    price: 14.49,
    description: ["Up to 10 premium accounts", "Access to special playlists", "Personalized music recommendations", "Licence for commercial use of music"],
    url: "/payment",
  },
];