import { Text } from "@/shared/ui/text";
import Image from "next/image";

export function AboutPage() {
  return (
    <div className=" flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex p-4 @container">
          <div className="flex gap-4 flex-col md:flex-row md:justify-between md:items-center">
            <Image
              src={"https://avatars.githubusercontent.com/u/70439662?v=4"}
              alt="profile"
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 min-w-32 max-h-32 max-w-32"
              width={128}
              height={128}
              priority
            />
            <div className="flex flex-col justify-center gap-2">
              <Text className="text-[22px] font-bold leading-tight tracking-[-0.015em]">
                Hi, I'm Manjoong
              </Text>
              <Text className="text-[#9cabba] text-base font-normal leading-normal">
                Front-End Developer
              </Text>
              <Text className="text-[#9cabba] text-base font-normal leading-normal">
                I'm a passionate front-end developer with a focus on creating
                intuitive and engaging user experiences. My goal is to build
                products that are not only visually appealing but also highly
                functional and accessible.
              </Text>
            </div>
          </div>
        </div>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          About Me
        </h2>
        <Text asChild>
          <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
            I'm a front-end developer with 3+ years of experience in building
            web applications using modern technologies like React. I have a
            strong understanding of HTML, CSS, and JavaScript, and I'm always
            eager to learn new frameworks and libraries. My development
            philosophy centers around clean, maintainable code and a user-first
            approach. I believe that great design is not just about aesthetics
            but also about usability and accessibility. I strive to create
            products that are both beautiful and easy to use for everyone.
          </p>
        </Text>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          My Strengths
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-secondary p-4 items-center">
            <div data-icon="Code" data-size="24px" data-weight="regular">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
              </svg>
            </div>
            <h2 className="text-base font-bold leading-tight">Clean Code</h2>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-secondary p-4 items-center">
            <div data-icon="Palette" data-size="24px" data-weight="regular">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89Zm13,93.71A15.89,15.89,0,0,1,198.21,160H152a32,32,0,0,0-32,32,16,16,0,0,1-21.31,15.07C62.49,194.3,40,164,40,128a88,88,0,0,1,87.09-88h.9a88.35,88.35,0,0,1,88,87.25A88.86,88.86,0,0,1,213.81,147.6ZM140,76a12,12,0,1,1-12-12A12,12,0,0,1,140,76ZM96,100A12,12,0,1,1,84,88,12,12,0,0,1,96,100Zm0,56a12,12,0,1,1-12-12A12,12,0,0,1,96,156Zm88-56a12,12,0,1,1-12-12A12,12,0,0,1,184,100Z"></path>
              </svg>
            </div>
            <h2 className="text-base font-bold leading-tight">UI/UX Design</h2>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-secondary p-4 items-center">
            <div
              data-icon="PersonArmsSpread"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M160,40a32,32,0,1,0-32,32A32,32,0,0,0,160,40ZM128,56a16,16,0,1,1,16-16A16,16,0,0,1,128,56ZM231.5,87.71A19.62,19.62,0,0,0,212,72H44a20,20,0,0,0-8.38,38.16l.13,0,50.75,22.35-21,79.72A20,20,0,0,0,102,228.8l26-44.87,26,44.87a20,20,0,0,0,36.4-16.52l-21-79.72,50.75-22.35.13,0A19.64,19.64,0,0,0,231.5,87.71Zm-17.8,7.9-56.93,25.06a8,8,0,0,0-4.51,9.36L175.13,217a7,7,0,0,0,.49,1.35,4,4,0,0,1-5,5.45,4,4,0,0,1-2.25-2.07,6.31,6.31,0,0,0-.34-.63L134.92,164a8,8,0,0,0-13.84,0L88,221.05a6.31,6.31,0,0,0-.34.63,4,4,0,0,1-2.25,2.07,4,4,0,0,1-5-5.45,7,7,0,0,0,.49-1.35L103.74,130a8,8,0,0,0-4.51-9.36L42.3,95.61A4,4,0,0,1,44,88H212a4,4,0,0,1,1.73,7.61Z"></path>
              </svg>
            </div>
            <h2 className="text-base font-bold leading-tight">Accessibility</h2>
          </div>
          <div className="flex flex-1 gap-3 rounded-lg border border-[#3b4754] bg-secondary p-4 items-center">
            <div
              data-icon="RocketLaunch"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M103.77,185.94C103.38,187.49,93.63,224,40,224a8,8,0,0,1-8-8c0-53.63,36.51-63.38,38.06-63.77a8,8,0,0,1,3.88,15.53c-.9.25-22.42,6.54-25.56,39.86C81.7,204.48,88,183,88.26,182a8,8,0,0,1,15.51,4Zm93-67.4L192,123.31v58.33A15.91,15.91,0,0,1,187.32,193L153,227.3A15.91,15.91,0,0,1,141.7,232a16.11,16.11,0,0,1-5.1-.83,15.94,15.94,0,0,1-10.78-12.92l-5.37-38.49L76.24,135.55l-38.47-5.37A16,16,0,0,1,28.7,103L63,68.68A15.91,15.91,0,0,1,74.36,64h58.33l4.77-4.77c26.68-26.67,58.83-27.82,71.41-27.07a16,16,0,0,1,15,15C224.6,59.71,223.45,91.86,196.78,118.54ZM40,114.34l37.15,5.18L116.69,80H74.36ZM91.32,128,128,164.68l57.45-57.45a76.46,76.46,0,0,0,22.42-59.16,76.65,76.65,0,0,0-59.11,22.47ZM176,139.31l-39.53,39.53L141.67,216,176,181.64Z"></path>
              </svg>
            </div>
            <h2 className="text-base font-bold leading-tight">
              Performance Optimization
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
