export function ProjectPage() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="tracking-light text-[32px] font-bold leading-tight">
              Projects
            </p>
            <p className="text-[#9cabba] text-sm font-normal leading-normal">
              Explore a selection of my recent projects, showcasing my skills in
              front-end development. Each project includes a brief description,
              screenshots, and links to live demos or repositories.
            </p>
          </div>
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">All</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">React</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Vue</p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-secondary pl-4 pr-4">
            <p className="text-sm font-medium leading-normal">Angular</p>
          </div>
        </div>
        <div className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuD_42ciHv-sbK0u-jfz9c84x_ou1BQvoCjNe7luHDhoaIJUdSA8Silm5C_mdPRk0LWUgn4HMzlILG2ORqQq2wUxI0Obbw4XF8CM64OFbsFBidvEn3FZhzEQ_c-5BJxaDv-hyA-8sqX2VIlDtGDNtmdYYoYZjcsMlgSGalGogg7vbukCfEyRrL7hroLFacT_-4VU_vvzTzUGtSqvf5P107DayhZu5kb4dqcn19_miCbEr8B5snNt9MKFbHnLWIBMgvA-ezrXUSeqJfQ)",
              }}
            ></div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Finance Manager
              </p>
              <div className="flex items-end gap-3 justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    React, Redux, Chart.js
                  </p>
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    A web application for managing personal finances, including
                    budgeting, expense tracking, and financial reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBXIoqb5OCyvc3ZRj0CcyU_XMQF2voYw4gP8yjsG2miHJqhJptg8yh9tmuDrPtlAzw5B9eWRqEqLPhQ_hvMojjce7KIeqXhgNoCJoTy8uVo6mwfyo7SjPjo82VfQ_jDAIOSOtOEiuHkhWaZTj9ZB0ZLc8Ustifpbsn9TP21iX-1KXMz0XSfRIwRql4uh38iyRVa35jGhr_j02BAV_uCebhuZ3IaNBliyOB6Y431vuHb5ROdNhF0GZo7yA7xZbJWco3DwnMJwrdgAgA)",
              }}
            ></div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
                E-commerce Store
              </p>
              <div className="flex items-end gap-3 justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    Vue.js, Vuex, Tailwind CSS
                  </p>
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    An e-commerce platform with features like product browsing,
                    shopping cart, user authentication, and order management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBkuM_B7uDyxrdBPXZBYSI72GfoGl9sdNLrXPtgeQQfygYg3w9uZWNdKghov-U4oGJQ2SJi9lpQOFOWdLVKsrHOnoFHAHB0qKr-uRqYybkutWryqlVBCDMS4ZL0vyWIv0AvYlmFhcxoV_Lwy9N4W9tXZG74bfFbAzitLm8kgWO_azj_a0Pox7v-5cGD5fEajFlzKULOsvOLNFHEZgWbSCjfSae8FbazFLrREWRfVch67MjBGGbXhqIIxKN7IyktpqSeopZyjFWIUJ8)",
              }}
            ></div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Social Media App
              </p>
              <div className="flex items-end gap-3 justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    Angular, TypeScript, RxJS
                  </p>
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    A social media application for sharing posts, following
                    users, and interacting with content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 @container">
          <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuD17WttIDYSH_n6qTu2zBJqvoiNX8QCJdE-Cu291DERM1qAUZ_cZCu4rUSmiFTnyAjwa5eQsHf2grh0XLPASgrypd0CKfG1TaZWLQz_R-Q-IvQBRoPY6rpGmxoeZD9AtQGG7JuTgj0f2xQVTrD5nmZkUHl7T882Y__YYxugzVyBz6R8c-Uc1tgCG4l6pThImJd49m_5oFtrFobYtrbIWKo1_pRmVzb-3XrHvurMtdzJPfB85WWSHMb6-av3cwclA4qIuzOVvLfUEfM)",
              }}
            ></div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
              <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Task Manager
              </p>
              <div className="flex items-end gap-3 justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    React, Context API, Material UI
                  </p>
                  <p className="text-[#9cabba] text-base font-normal leading-normal">
                    A task management application with features for creating,
                    organizing, and tracking tasks and projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
