import React from "react";

interface PageTitleProps {
  title: string;
  description: string;
}
const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { title, description } = props;

  return (
    <div className="relative bg-black text-white p-4 sm:p-6 rounded-sm overflow-hidden">
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-white font-bold mb-1">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PageTitle;
