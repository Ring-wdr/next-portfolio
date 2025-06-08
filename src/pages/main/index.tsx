import Image from "next/image";
import Link from "next/link";

export function MainPage() {
  return (
    <div className="md:px-8 lg:px-16 xl:px-24 flex flex-1 justify-center">
      <div className="flex flex-col w-full max-w-full md:max-w-4xl flex-1">
        <div className="w-full">
          <div className="p-0 md:p-4">
            <div className="relative flex min-h-[350px] md:min-h-[480px] flex-col gap-6 md:gap-8 md:rounded-lg items-start justify-end px-10 pb-10 overflow-hidden w-full py-10">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0jtvmiLDAyk9NLnW1f-lS4Dvi4fFMew9yJkP5GIlpgrIqaGvOl728dCzcMwBda6vXEpWZ9eygiin21vsImApXgVrK2fIiN-vWs0GZwJtsaeBSZEspdOZLdECuD9yfjbBPwaozIt2YnSy3h5Gpmbhrtcb5tlRwV9zolMWtswMgUsCwm_aDIMycu6tgqoOhMDyd1fbb9lncWIKEIDKgG6rgwIitNxILvR1eC_mJioFjm6Wigu-dLbVFGPKqk-GT8X-BcdTSzmgfJrU"
                alt="Manjoong profile background"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                quality={90}
                className="object-cover object-center z-0"
              />
              <div
                className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 to-background/40"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2 text-left relative z-20">
                <h1 className="flex items-center text-4xl font-black mb-4 no-underline bg-gradient-to-r from-primary from-50% via-[#ff5858] via-50% to-[#cc2e5d] bg-[length:200%_100%] bg-clip-text text-transparent transition-all duration-300 ease-out break-keep hover:bg-[position:100%_0]">
                  Hi, I'm Manjoong, a Front-End Developer
                </h1>
                <h2 className="text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  I build beautiful and functional web experiences using modern
                  technologies. Explore my portfolio to see my work and learn
                  more about my skills.
                </h2>
              </div>
              <Link
                href="/project"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0c7ff2] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] relative z-20 text-white"
              >
                <span className="truncate">View Projects</span>
              </Link>
            </div>
          </div>
        </div>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Featured Projects
        </h2>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-3">
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAGqyVjkpGTbUfqLGfvx33jlW8rzpGMyMtsaHh7bijR99ho6kRN9p4FWNmJi7ej2VA_gsk6jvsfMJ3w6Ok1kYs0IDnTCmaYLnnv9m9IfXoxBgf1Io0XO4zpGZBAP8D77AjxOg1jhQSXjXdASyzxJEDHbmt-XARzGxy2wq9k-Wp_1LTSwhc65js0BniYkSoqH30QariJtUiDNw5RvzmuCWfXw_XM9TntqIbXlgovSTMauh6VaQia1fxfgU4HqptkewUV5oEneX1ZqN0)",
                }}
              ></div>
              <div>
                <p className="text-base font-medium leading-normal">
                  Project Zenith
                </p>
                <p className="text-[#9cabba] text-sm font-normal leading-normal">
                  A responsive web application built with React and Node.js.
                </p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBTu3xgmc_veUOS6xE2aMagggf3XlQClWI_TJb-ekMTbdVg6x8ad6Uv1Ezp7r7IvfZHY8Y7hYIHIAQNKPJVuS7X8RTtUR5aVDccGz9jxM3HRb4p9KUpTAIVW15l8YloGWFXNicK9pX8Rtd-yGBvepXOqEsloQFL8Ob5FMaKVrcD5ewPz7w_0EwbN1rlVj2uO7T-J8ME6Zhfh0i6gC8JMySjAaMaBHlxGXfRumvJ0Kk6xBDgYMEingwyGhfV75T9b1Kda1tBC9D9ews)",
                }}
              ></div>
              <div>
                <p className="text-base font-medium leading-normal">
                  Online Storefront
                </p>
                <p className="text-[#9cabba] text-sm font-normal leading-normal">
                  An e-commerce platform with a focus on user experience.
                </p>
              </div>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                style={{
                  backgroundImage:
                    "url(https://lh3.googleusercontent.com/aida-public/AB6AXuA29ACvBscUID3sMtFUqW4ihOrW0Lv7wKi1U4wnybVU8xeDIpBYxWjBDiVLI9ERf8NRZ2ZgQcie2lwSB42byFhi_TyGZFSRb6cdWPVlNTatyijXg-TLaCu3p6NRjeZaBB1FUS7XBweu0NFrqS5yin8bjZS_7u3HlFQ808nIKnD_Rzgzc_OBFvubYWvG_zabc3lcYbxe892mFoVJ6zHeYlFuyj10r-0PIynnVEeC2Z9A-5R-9-Y5LOK0i9oIA0VmWEGcRZ_DqqmDRCE)",
                }}
              ></div>
              <div>
                <p className="text-base font-medium leading-normal">
                  Admin Dashboard
                </p>
                <p className="text-[#9cabba] text-sm font-normal leading-normal">
                  A comprehensive dashboard for managing business operations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Tech Stack
        </h2>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">React</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">JavaScript</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">HTML</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">CSS</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Node.js</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Express</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">MongoDB</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Git</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Webpack</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">
              Responsive Design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
