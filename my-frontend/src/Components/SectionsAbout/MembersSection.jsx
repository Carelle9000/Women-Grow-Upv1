import React from 'react';


const members = [
  {
    name: "Ms. Yvonne B. Ralston",
    title: "Directrice générale de l'Association des Femmes Leaders",
    image: "/src/assets/images/1.jpeg", // Replace with your image URL
  },
  {
    name: "Ms. Kristi Muir",
    title: "Directrice exécutive de Women Transforming Cities",
    image: "/src/assets/images/2.jpeg", // Replace with your image URL
  },
  {
    name: "Ms. Sarah H. Karam",
    title: "Directrice de l'Université de la Femme",
    image: "/src/assets/images/4.jpg", // Replace with your image URL
  },
  {
    name: "Ms. Sarah Elizabeth",
    title: "Directrice des Programmes de Women Empowerment",
    image: "/src/assets/images/3.jpg", // Replace with your image URL
  },
];

const MemberCard = ({ member }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 transition-transform duration-300 transform hover:scale-105 border-shadow-2xl">
      <img
        src={member.image}
        alt={member.name}
        className="w-48 h-48 object-cover rounded-full mb-2 transition-transform duration-300 transform hover:scale-110"
      />
      <h3 className="text-lg font-bold text-fuchsia-700 hover:text-purple-600 transition-colors duration-300">
        {member.name}
      </h3>
      <p className="text-sm text-black hover:text-fuchsia-600 transition-colors duration-300">
        {member.title}
      </p>
    </div>
  );
};

const MembersSection = () => {
  return (
    <div className="bg-indigo-50  p-8">
      <h1 className="text-2xl font-bold ml-5 text-fuchsia-700 mb-6">Nos  membres</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

export default MembersSection;