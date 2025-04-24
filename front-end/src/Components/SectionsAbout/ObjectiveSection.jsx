"use client";
import * as React from "react";

function ObjectiveSection() {
  return (
    <section className="flex flex-col rounded-none mt-10 mb-10">
      <div className="flex flex-wrap gap-5 justify-between items-start self-center w-full leading-6 max-w-[1377px] max-md:max-w-full">
        <div className="flex flex-col mt-16 max-md:mt-10 max-md:max-w-full">
          <header className="flex flex-col pr-20 pl-2 leading-none max-md:pr-5 max-md:max-w-full">
            <h1 className="self-start text-3xl font-bold text-fuchsia-700 max-md:text-4xl">
              Notre objectif
            </h1>
           
          </header>
          <div className="flex gap-2.5 mt-12 text-1xl text-black max-md:mt-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/3f46a4696d50a6d8d3e2cea2abdf03bc6316da74?placeholderIfAbsent=true"
              alt="Support icon"
              className="object-contain shrink-0 self-start mt-3 w-10 aspect-square"
            />
            <p className="flex-auto w-[412px]">
              {" "}
              Soutien et accompagnement
              <br />
              Offrir des ressources (contacts
              <br /> d'urgence, adresses d'associations, <br />
              services d'aide juridique)
            </p>
          </div>
          <div className="flex gap-2.5 mt-12 text-1xl text-black max-md:mt-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/3f46a4696d50a6d8d3e2cea2abdf03bc6316da74?placeholderIfAbsent=true"
              alt="Support icon"
              className="object-contain shrink-0 self-start mt-3 w-10 aspect-square"
            />
            <p className="flex-auto w-[412px]">
              {" "}
              Soutien et accompagnement
              <br />
              Offrir des ressources (contacts
              <br /> d'urgence, adresses d'associations, <br />
              services d'aide juridique)
            </p>
          </div>
          <div className="flex gap-2.5 self-start mt-3 text-1xl text-black">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b709890abb4586226059723199c506c4f66958ae?placeholderIfAbsent=true"
              alt="Empowerment icon"
              className="object-contain shrink-0 self-start w-10 aspect-square"
            />
            <p className="flex-auto">
              {" "}
              Promotion de l'autonomisation
              <br />
              Diffuser des formations <br />
              (leadership, entrepreneuriat,
              <br /> développement personnel).
              <br />
            </p>
          </div>
          <div className="flex gap-2.5 self-start mt-10 text-1xl text-black ">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/bda8214d7005a71e13b8409244fc99f71e7f2019?placeholderIfAbsent=true"
              alt="Community icon"
              className="object-contain shrink-0 self-start w-10 aspect-square"
            />
            <p className="flex-auto">
              Création de communauté
              <br />
              Fédérer une communauté
              <br />
              solidaire autour des causes
              <br />
              féminines.
              <br />
            </p>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/03de6eb0d69e24c8142125b37a287565ddc6f410?placeholderIfAbsent=true"
          alt="Women empowerment illustration"
          className="object-contain shrink-0 self-end mt-16 max-w-full aspect-[0.29] w-[201px] max-md:mt-10"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/bb158d337af8baa43b1f4cb8bd94dd879890a1e9?placeholderIfAbsent=true"
          alt="Women empowerment illustration"
          className="object-contain shrink-0 max-w-full aspect-[0.29] w-[200px]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/f4ac4e3104648bf686cdf168bbbca997d3c1f593?placeholderIfAbsent=true"
          alt="Women empowerment illustration"
          className="object-contain shrink-0 self-end mt-16 max-w-full aspect-[0.29] w-[201px] max-md:mt-10"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/0a2a6f383b5e3eedd9626fda0ae06d1ecbac816d?placeholderIfAbsent=true"
          alt="Women empowerment illustration"
          className="object-contain shrink-0 max-w-full aspect-[0.29] w-[200px]"
        />
      </div>

      <section
        className="flex relative flex-col px-0.5 mt-12 w-full min-h-[284px] max-md:mt-10 max-md:max-w-full"
        aria-label="Statistics"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/82d19c0366e756a73cf1df9cbc61b5d2ab8d91f0?placeholderIfAbsent=true"
          alt="Background"
          className="object-cover absolute inset-0 size-full py-10 z-10"
        />
        <div className="relative px-20 py-7.5 bg-black/50 max-md:px-5 max-md:-mr-0.5 max-md:max-w-full z-30 mt-10">
          <div className="flex gap-5 max-md:flex-col ">
            <div className="w-[24%] max-md:ml-0 max-md:w-full">
              <p className="relative text-3xl font-bold text-center text-white max-md:mt-10">
                60k +<br />
                Femmes formees
                <br />
                ou
                <br />
                accompagnees
              </p>
            </div>
            <div className="ml-5 w-[24%] max-md:ml-0 max-md:w-full">
              <p className="relative text-3xl font-bold text-center text-white max-md:mt-10">
                20k +<br />
                femmes inscrites
                <br />
                sur le site
              </p>
            </div>
            <div className="ml-5 w-[18%] max-md:ml-0 max-md:w-full">
              <p className="relative text-3xl font-bold text-center text-white max-md:mt-10">
                1000 +<br />
                Temoignages
                <br />
                de femmes
              </p>
            </div>
            <div className="ml-5 w-[34%] max-md:ml-0 max-md:w-full">
              <p className="relative text-3xl font-bold text-center text-white max-md:mt-10">
                25k +<br />
                contenus diffuses
                <br />
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-start self-center mt-20 w-full max-w-[1297px] max-md:mt-10 max-md:max-w-full"
        aria-label="Team"
      >
        <h2 className="text-3xl font-bold leading-none text-fuchsia-700 max-md:text-4xl">
          Notre Equipe
        </h2>
        <div className="self-stretch mt-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-3/12 max-md:ml-0 max-md:w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/32ebfa7a7be2431b509ad80d109dca8ac5a4c020?placeholderIfAbsent=true"
                alt="Team member"
                className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.59] w-[268px] max-md:mt-10"
              />
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/9fff1fa0751b62349046209ab9007df7e573f1d8?placeholderIfAbsent=true"
                alt="Team member"
                className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.59] w-[268px] max-md:mt-10"
              />
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/55dbe08125ed54cfd2d10cd4f65d2f564cd81b31?placeholderIfAbsent=true"
                alt="Team member"
                className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.59] w-[268px] max-md:mt-10"
              />
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/83017adf8b8604f88139d7ec8d6559954127b38c?placeholderIfAbsent=true"
                alt="Team member"
                className="object-contain grow shrink-0 max-w-full rounded-3xl aspect-[0.59] w-[268px] max-md:mt-10"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch mt-7 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="w-3/12 max-md:ml-0 max-md:w-full">
              <div className="mt-3.5 text-xl font-bold leading-9 text-black max-md:mt-10">
                <a
                  href="https://www.unwomen.org/en/about-us/directorate/executive-director"
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    textDecoration: "underline",
                    fontSize: "24px",
                    color: "rgba(155,56,188,1)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ms. Sima Bahous
                </a>
                <span
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  Executive Director of UN Women and Under-Secretary-General of
                  the United Nations
                </span>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="self-stretch my-auto text-2xl font-bold leading-9 text-black max-md:mt-10">
                <a
                  href="https://www.unwomen.org/en/about-us/directorate/ded-resource-management-sustainability-and-partnerships"
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    textDecoration: "underline",
                    color: "rgba(155,56,188,1)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ms. Kirsi Madi
                </a>

                <span
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "400",
                    fontSize: "20px",
                  }}
                >
                  Executive Director of UN Women and Under-Secretary-General of
                  the United Nations
                </span>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="text-2xl font-bold leading-9 text-black max-md:mt-10">
                <a
                  href="https://www.unwomen.org/fr/about-us/directorate/ded-policy-programme-civil-society-and-intergovernmental-support"
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    textDecoration: "underline",
                    color: "rgba(155,56,188,1)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mme Sarah Hendriks
                </a>

                <span
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "400",
                    fontSize: "20px",
                  }}
                >
                  Directrice exécutive adjointe a.i. chargée de l'appui
                  normatif, de la coordination du système .
                </span>
              </div>
            </div>
            <div className="ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="text-2xl font-bold leading-9 text-black max-md:mt-10">
                <a
                  href="https://www.unwomen.org/fr/about-us/directorate/ded-policy-programme-civil-society-and-intergovernmental-support"
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    textDecoration: "underline",
                    color: "rgba(155,56,188,1)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mme Sarah Hendriks
                </a>

                <span
                  style={{
                    fontFamily:
                      "Tienne, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "400",
                    fontSize: "20px",
                  }}
                >
                  Directrice exécutive adjointe a.i. chargée de l'appui
                  normatif, de la coordination du système .
                </span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mt-20 text-3xl font-bold leading-none text-fuchsia-700 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
          Nos anciens membres
        </h2>
        <div className="flex gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/4e6090bf87b1ef3dcc2c4945e07d86c5acd72ede?placeholderIfAbsent=true"
          alt="Former member"
          className="object-contain mt-20 max-w-full aspect-[1.39] w-[180px] max-md:mt-10"
        />
        <p>
            <h3 className="text-fuchsia-500" > Ms.Phmizele Mlambo-Ngucka</h3>
            Former Executive Director of UN WomenFormer <br /> Under-Secretary-General of the United Nation
        </p>
        </div>
        <div className="flex flex-row gap-2">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/ac337c87b27ab081d5b3048e36e4679155a44a4d?placeholderIfAbsent=true"
          alt="Former member"
          className="object-contain mt-11 max-w-full aspect-[1.49] w-[180px] max-md:mt-10"
        />
        <p className="mb-10">
            <h3 className="text-fuchsia-500" > Ms.Michelle Bachelet</h3>
            Former Executive Director of UN Women <br />Former Under-Secretary-General of the United Nations        </p>
        </div>
      </section>

      
    </section>
  );
}

export default ObjectiveSection;
