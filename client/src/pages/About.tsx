export default function About() {
  return (
    <div className="w-full min-h-screen ">
      {/* About me section */}
      <section className="about-me-section w-full md:h-[60vh]">
        <div className="w-full h-full py-10 px-3 md:p-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="details h-full w-full md:w-1/2 flex flex-col items-center md:items-start text-center sm:text-start gap-6 md:gap-10 justify-center">
            <h1 className="text-3xl md:text-5xl font-bold">
              Hey there, <span>I'm </span>
              <span className="text-red-500 tracking-tighter">
                Nouman Khan
              </span>
            </h1>
            <p className="text-gray-500 text-lg sm:text-xl">
              A self-taught web developer, Passionate about buliding
              full-stack applications using the{" "}
              <span className="font-semibold text-black">MERN </span>
              stack with{" "}
              <span className="font-semibold text-black">TS.</span>
            </p>
            {/* buttons */}
            <div className="flex gap-4 ">
              <button
                className="py-2 md:py-3 px-3 md:px-6 bg-black text-white rounded-lg font-semibold border border-black 
          hover:bg-white hover:text-black transition-all duration-300 shadow-md hover:shadow-lg scale-100 hover:scale-105">
                Visit Portfolio
              </button>

              <button
                className="py-2 md:py-3 px-3 md:px-6 bg-white text-black rounded-lg font-semibold border border-black 
          hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg scale-100 hover:scale-105">
                Contact Me
              </button>
            </div>
          </div>
          <div className="profile-image h-full grow inline-flex items-center justify-center">
            <div className="size-44 md:size-60 bg-white rounded-full shadow">
              <img
                src="/profile.jpeg"
                alt="profile-photo"
                className="w-full h-full object-cover rounded-full 
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* My journey section */}

      <section className="my-journey-section px-4 py-2 bg-gray-50">
        <h3 className="text-3xl font-bold my-8">My journey</h3>
        <div className="w-full py-3 mb-5 min-h-[40vh] flex flex-col lg:flex-row justify-between lg:justify-around items-centergap-6 md:gap-3">
          <div className="content h-full w-full lg:w-2/3 pb-4 lg:p-4 text-lg">
            <p className="mb-4">
              {" "}
              My web development journey started with HTML and grew
              into mastering CSS, JavaScript, and modern frameworks
              like React. Exploring backend development with Node.js
              and Express enabled me to build full-stack applications.{" "}
            </p>{" "}
            <p>
              {" "}
              This blog platform is a milestone in my learning—a MERN
              stack app with TypeScript, authentication, and social
              features. I'm excited to keep growing as a developer.
            </p>
          </div>
          <div className="photo h-full w-3/4 lg:w-fit overflow-hidden">
            <img
              className="lg:h-52 w-full lg:w-auto object-cover rounded-lg"
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* about this platform */}
      <section className="about-this-platform-section py-12 px-4">
        <div className="text-center my-8">
          <h3 className="text-3xl font-bold mb-4">
            Blog Platform Features
          </h3>
          <p className="text-xl text-gray-600">
            A full-featured bloggin platform built with the MERN stack
            and Typsript.
          </p>
        </div>
        <div className="container-r w-full min-h-[70vh] bg-gray-100"></div>
      </section>
    </div>
  );
}
