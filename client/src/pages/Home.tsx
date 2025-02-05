import React from "react";
const Home: React.FC = () => {
  return (
    <div className="w-full h-[90vh] p-6">
      <div
        className="w-full h-full bg-cover bg-center relative rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/product-design.jpg')",
        }} // Replace with your actual image URL
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black-10"></div>
        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] p-10">
          <div className="title mb-4">
            <h1 className="text-4xl font-semibold text-white">
              {" "}
              Breaking Into Product Design: <br />
              Advice from Unitiled Founder, Frankie
            </h1>
          </div>
          <div className="desc">
            <p className="text-gray-200 text-lg leading-tight">
              Let's get one thing out of the way: you don't need a
              fancy Bachelor's Degree to get into Product Design. We
              set down with Frankie Sullivan to talk about gatekeeping
              in product design and how anyone can get into his
              growing industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
