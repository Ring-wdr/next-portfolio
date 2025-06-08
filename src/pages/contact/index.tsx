export function ContactPage() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Contact
        </h2>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
          I'm always open to new opportunities and collaborations. Feel free to
          reach out to me via email or connect with me on LinkedIn.
        </p>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-base font-medium leading-normal pb-2">Email</p>
            <input
              placeholder="your.email@example.com"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-0 border border-[#3b4754] bg-secondary focus:border-[#3b4754] h-14 placeholder:text-[#9cabba] p-[15px] text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex px-4 py-3 justify-start">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
