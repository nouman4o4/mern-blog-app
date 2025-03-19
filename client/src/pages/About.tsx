import { Lock, MessageSquare, Pen, User } from "lucide-react";

import { motion } from "framer-motion";

interface Technology {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}
interface Features {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}
interface Milestone {
  year: string;
  title: string;
  description: string;
}
const features: Features[] = [
  {
    id: 1,
    title: "Custom Authentication",
    description:
      "Securely manage user authentication with custom login and registration systems",
    icon: <Lock size={30} />,
  },
  {
    id: 2,
    title: "Blog Management",
    description:
      "Effortlessly create, edit, and manage blog posts with our intuitive interface",
    icon: <Pen size={30} />,
  },
  {
    id: 3,
    title: "Profile Management",
    description:
      "Allow users to manage their profiles, including personal details and settings",
    icon: <User size={30} />,
  },
  {
    id: 4,
    title: "Social Interaction",
    description:
      "Facilitate social interactions among users, including commenting, liking, and sharing",
    icon: <MessageSquare size={30} />,
  },
];

const technologies: Technology[] = [
  {
    id: 1,
    name: "MongoDB",
    description:
      "NoSQL database for storing blog posts, user data, and interactions.",
    icon: (
      <svg
        className="w-12 h-12 text-green-600"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Express.js",
    description:
      "Backend framework for building the API and handling server-side logic.",
    icon: (
      <svg
        className="w-12 h-12 text-gray-600"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "React",
    description:
      "Frontend library for building the user interface with reusable components.",
    icon: (
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z"
          fill="#53C1DE"
        />
        <path
          fill-rule="evenodd"
          viewBox="0 0 32 32"
          clip-rule="evenodd"
          d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z"
          fill="#53C1DE"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Node.js",
    description:
      "JavaScript runtime for executing server-side code and handling requests.",
    icon: (
      <svg
        className="w-12 h-12 text-green-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.203-.182-.277-.072-.314.496-.165.588-.203 1.109-.493.056-.033.129-.021.182.021l1.87 1.12c.072.039.166.039.231 0l7.319-4.237c.072-.039.116-.116.116-.202V7.768c0-.087-.044-.165-.116-.202l-7.319-4.219c-.072-.039-.165-.039-.231 0L4.552 7.566c-.072.039-.116.12-.116.202v8.457c0 .087.044.165.116.202l2 1.157c1.082.548 1.762-.095 1.762-.735V8.502c0-.12.095-.212.21-.212h.936c.116 0 .21.095.21.212v8.343c0 1.449-.788 2.288-2.164 2.288-.422 0-.752 0-1.688-.46l-1.925-1.099a1.55 1.55 0 01-.771-1.34V7.768c0-.55.293-1.064.771-1.339l7.316-4.237a1.637 1.637 0 011.544 0l7.317 4.237c.479.274.771.789.771 1.339v8.458c0 .549-.293 1.063-.771 1.34l-7.317 4.236c-.234.136-.504.204-.773.204zm2.256-5.816c-3.21 0-3.87-1.468-3.87-2.714 0-.116.094-.212.21-.212h.954c.104 0 .192.075.209.179.138.963.556 1.445 2.499 1.445 1.521 0 2.175-.342 2.175-1.147 0-.464-.186-.811-2.576-1.045-1.998-.193-3.242-.64-3.242-2.246 0-1.485 1.247-2.366 3.339-2.366 2.347 0 3.503.81 3.649 2.568a.21.21 0 01-.057.165.217.217 0 01-.151.054h-.955a.211.211 0 01-.205-.165c-.229-1.011-.784-1.338-2.28-1.338-1.678 0-1.87.587-1.87 1.024 0 .53.232.689 2.494.991 2.239.302 3.323.73 3.323 2.29 0 1.604-1.33 2.5-3.646 2.5z" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "TypeScript",
    description:
      "Typed superset of JavaScript for building more robust and maintainable code.",
    icon: (
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 32 32"
        fill="#007acc"
        className=""
        xmlns="http://www.w3.org/2000/svg">
        <path d="M23.827,8.243A4.424,4.424,0,0,1,26.05,9.524a5.853,5.853,0,0,1,.852,1.143c.011.045-1.534,1.083-2.471,1.662-.034.023-.169-.124-.322-.35a2.014,2.014,0,0,0-1.67-1c-1.077-.074-1.771.49-1.766,1.433a1.3,1.3,0,0,0,.153.666c.237.49.677.784,2.059,1.383,2.544,1.095,3.636,1.817,4.31,2.843a5.158,5.158,0,0,1,.416,4.333,4.764,4.764,0,0,1-3.932,2.815,10.9,10.9,0,0,1-2.708-.028,6.531,6.531,0,0,1-3.616-1.884,6.278,6.278,0,0,1-.926-1.371,2.655,2.655,0,0,1,.327-.208c.158-.09.756-.434,1.32-.761L19.1,19.6l.214.312a4.771,4.771,0,0,0,1.35,1.292,3.3,3.3,0,0,0,3.458-.175,1.545,1.545,0,0,0,.2-1.974c-.276-.395-.84-.727-2.443-1.422a8.8,8.8,0,0,1-3.349-2.055,4.687,4.687,0,0,1-.976-1.777,7.116,7.116,0,0,1-.062-2.268,4.332,4.332,0,0,1,3.644-3.374A9,9,0,0,1,23.827,8.243ZM15.484,9.726l.011,1.454h-4.63V24.328H7.6V11.183H2.97V9.755A13.986,13.986,0,0,1,3.01,8.289c.017-.023,2.832-.034,6.245-.028l6.211.017Z" />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Tailwind CSS",
    description:
      "Utility-first CSS framework for creating custom designs without leaving HTML.",
    icon: (
      <svg
        className="w-12 h-12 text-teal-500"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
];
const milestones: Milestone[] = [
  {
    year: "Start",
    title: "HTML Foundations",
    description:
      "Began my web development journey by learning HTML fundamentals and basic web page structure.",
  },
  {
    year: "Next",
    title: "CSS & JavaScript",
    description:
      "Advanced to styling with CSS and adding interactivity with JavaScript to create dynamic web pages.",
  },
  {
    year: "Growth",
    title: "React Frontend",
    description:
      "Mastered React for building complex user interfaces with reusable components and state management.",
  },
  {
    year: "Backend",
    title: "Node.js & Express",
    description:
      "Expanded into backend development with Node.js and Express to create RESTful APIs.",
  },
  {
    year: "Database",
    title: "MongoDB",
    description:
      "Learned MongoDB for data persistence and building full-stack applications with the MERN stack.",
  },
  {
    year: "Advanced",
    title: "TypeScript",
    description:
      "Adopted TypeScript to write more maintainable code with static typing and better tooling.",
  },
];
export default function About() {
  return (
    <div className="w-full min-h-screen ">
      {/* About me section */}
      <section className="about-me-section w-full md:h-[60vh]">
        <div className="w-full h-full py-10 px-3 md:p-8 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-0">
          <motion.div
            animate={{ y: -40 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="details h-full w-full mb-[-40px] md:w-1/2 flex flex-col items-center md:items-start text-center sm:text-start gap-6 md:gap-10 justify-center">
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
          hover:bg-white hover:text-black transition-all duration-300 shadow-md hover:shadow-lg scale-95 hover:scale-105 active:scale-95 cursor-pointer">
                Visit Portfolio
              </button>

              <button
                className="py-2 md:py-3 px-3 md:px-6 bg-white text-black rounded-lg font-semibold border border-black 
          hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg scale-95 hover:scale-105 active:scale-95 cursor-pointer">
                Contact Me
              </button>
            </div>
          </motion.div>
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
        <h3 className="text-2xl md:text-3xl font-bold my-8 ">
          My journey
        </h3>
        <div className="w-full py-3 mb-5 min-h-[40vh] flex flex-col lg:flex-row justify-between lg:justify-around items-centergap-6 md:gap-3">
          <div className="content h-full w-full lg:w-2/3 pb-4 lg:p-4 text-gray-700 md:text-lg">
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
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Blog Platform Features
          </h3>
          <p className="text-xl text-gray-600">
            A full-featured bloggin platform built with the MERN stack
            and Typsript.
          </p>
        </div>
        <div
          className="container-r w-full min-h-[60vh] px-2 sm:p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-7
        ">
          {features.map((feature) => (
            <div className="min-h-50 rounded-lg bg-gray-50 shadow-lg p-4 md:p-8 hover:scale-[102%] hover:scale-3d transition duration-75">
              {" "}
              <div className="icon mb-5 text-red-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="pt-4 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Technologies section */}
      <section className="about-this-platform-section py-12 px-4 bg-gray-50">
        <div className="text-center my-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Technologies Used
          </h3>
          <p className="text-xl text-gray-600">
            The modern tech stack powering this blog platform.
          </p>
        </div>
        <div
          className="container-r w-full min-h-[60vh] px-2 sm:p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7
        ">
          {technologies.map((technology) => (
            <div className="min-h-50 flex flex-col items-center gap-8 rounded-lg bg-white shadow-lg p-4 md:p-8 hover:scale-[102%] hover:scale-3d transition duration-75">
              {" "}
              <div className="icon text-red-500">
                {technology.icon}
              </div>
              <h3 className="text-xl font-bold">{technology.name}</h3>
              <p className=" text-gray-600 text-center">
                {technology.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* My learnings section */}
      <section className="my-learnings-section py-12 px-2 md:mx-4 bg-white">
        <div className="text-center my-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            My Learnings
          </h3>
          <p className="text-xl text-gray-600">
            The key milestones in my self-taught web development
            journey.
          </p>
        </div>
        <div
          className="container- w-full min-h-[60vh] relative
        ">
          <div className="absolute h-full hidden md:block w-1 bg-red-200 top-0 left-1/2 translate-x-1/2"></div>
          {milestones.map((milestone, index) => (
            // map item
            <div
              className={`min-h-[20vh] flex items-center my-2 ${
                index % 2 === 0 ? "flex-row-reverse" : "flex-row"
              }`}>
              {/* box */}
              <div
                className={`box h-full w-full md:w-1/2 flex justify-between items-center px-2 md:px-4 py-5 gap-6 ${
                  index % 2 === 0 ? "flex-row-reverse" : "flex-row"
                }`}>
                <div className="content grow rounded-lg shadow-lg py-4 px-2">
                  <h1
                    className={`text-xl font-bold py-2 ${
                      index % 2 === 0 ? "text-start" : "text-end"
                    }
                  `}>
                    {milestone.title}
                  </h1>
                  <p className={`text-gray-600`}>
                    {milestone.description}
                  </p>
                </div>
                <button className="name size-16 shrink-0 text-sm font-semibold text-white rounded-full bg-red-400">
                  {milestone.year}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
