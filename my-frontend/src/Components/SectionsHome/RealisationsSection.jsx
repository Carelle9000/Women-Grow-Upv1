"use client";
import * as React from "react";

function RealisationsSection() {
  return (
    <section className="flex flex-col rounded-3xl pl-20 pr-20 bg-indigo-50 pb-10">
      <h2 className="self-start ml-5 text-4xl font-bold leading-none text-fuchsia-700 max-md:ml-2.5 max-md:text-4xl">
        Realisations
      </h2>
      <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[49%] max-md:ml-0 max-md:w-full">
            <div className="w-full max-md:mt-9 max-md:max-w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/76c10ae05b0b457175f7f9f32e2f3ebbcf8cf262?placeholderIfAbsent=true"
                alt="Project realisation main image"
                className="object-contain w-full rounded-3xl aspect-[2.7] max-md:max-w-full transition-transform duration-300 transform hover:scale-105"
              />
              <div className="mt-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-[30%] max-md:ml-0 max-md:w-full">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/85dd66528ea3b7782df27be36a18cbd1a48e34b4?placeholderIfAbsent=true"
                      alt="Project realisation detail"
                      className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.92] w-[178px] max-md:mt-6 transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>
                  <div className="ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/86e00670ed901ed9abaaf7f237c1d58c3694647c?placeholderIfAbsent=true"
                      alt="Project realisation detail"
                      className="object-contain grow w-full rounded-3xl aspect-[2.11] max-md:mt-6 transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[18%] max-md:ml-0 max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/59d43b8cd048917082a5869e4b8c0a7b5db443c4?placeholderIfAbsent=true"
              alt="Project realisation vertical image"
              className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.52] w-[232px] max-md:mt-9 transition-transform duration-300 transform hover:scale-105"
            />
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/cba33a1417084792b7fd21cf42cfe7f18f4579fb?placeholderIfAbsent=true"
              alt="Project realisation large image"
              className="object-contain grow w-full rounded-3xl aspect-[0.93] max-md:mt-9 transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealisationsSection;
