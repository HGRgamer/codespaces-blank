import { CiInstagram, CiLinkedin, CiTwitter } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    <div className="w-full bg-textcol bottom-0 md:flex grid justify-between p-8 text-2xl text-secondary">
      <div className="flex flex-col items-center w-full md:w-1/3 justify-center">
        <strong className="text-4xl font-algerian text-accent">Batua</strong>
        <p className="text-xl mt-5 text-accent">
          Easily manage your spending, track your expenses, and gain control
          over your financial future with our powerful, intuitive expense
          tracking tool. Your path to smarter financial decisions starts here.
        </p>
        <p className="text-2xl mt-5 text-accent">© 2024 Batua. All rights reserved.</p>
      </div>
      <div className="flex flex-col items-center mt-6 md:mt-0 w-full md:w-1/3 justify-center">
        <strong className="text-4xl font-algerian text-accent">
          Contact Us
        </strong>
        <p className="text-xl mt-5 text-accent">Email: maheshwarivinayak90@gmail.com</p>
        
      </div>
      <div className="flex flex-col items-center mt-6 md:mt-0 w-full md:w-1/3 justify-center">
        <strong className="text-4xl font-algerian text-accent">
          Connect with Us{" "}
        </strong>
        <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/maheshwarivinayak" target="_blank" rel="noreferrer" className="flex">
          <CiLinkedin className="text-4xl mt-5 text-accent" />
          <p className="text-xl mt-5 text-accent">VinayakMaheshwari</p>
          </a>
        </div>
        <div className="flex space-x-4 ">
        <a href="https://www.instagram.com/not_vinayak_m/" target="_blank" rel="noreferrer" className="flex">
          <CiInstagram className="text-4xl mt-5 text-accent" />
          <p className="text-xl mt-5 text-accent">@Not_Vinayak_M</p>
          </a>
        </div>
        <div className="flex space-x-4 ">
            <a href="https://x.com/Not_Vinayak" target="_blank" rel="noreferrer" className="flex">
          <FaXTwitter className="text-3xl mt-5 text-accent" />
          <p className="text-xl mt-5 text-accent">@Not_Vinayak</p>
          </a>
        </div>
      </div>
    </div>
  );
};
