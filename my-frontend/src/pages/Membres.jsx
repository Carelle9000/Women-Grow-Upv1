import React from "react";
import Layout from "@/components/layout";
import MemberList from "@/components/members/MemberList";

const sampleMembers = [
  {
    id: 101,
    name: "Sophie Dubois",
    avatar: "",
    role: "Administrateur",
    joinDate: "Mars 2025",
    isOnline: true,
    topics: 34,
    posts: 287,
  },
  {
    id: 102,
    name: "Claire Martin",
    avatar: "",
    role: "Modérateur",
    joinDate: "Janvier 2025",
    isOnline: false,
    topics: 19,
    posts: 142,
  },
  {
    id: 103,
    name: "Marie Laurent",
    avatar: "",
    role: "Membre",
    joinDate: "Avril 2025",
    isOnline: true,
    topics: 7,
    posts: 53,
  },
  {
    id: 104,
    name: "Lucie Girard",
    avatar: "",
    role: "Membre",
    joinDate: "Février 2025",
    isOnline: false,
    topics: 12,
    posts: 89,
  },
  {
    id: 105,
    name: "Emma Petit",
    avatar: "",
    role: "Membre",
    joinDate: "Mars 2025",
    isOnline: true,
    topics: 5,
    posts: 41,
  },
  {
    id: 106,
    name: "Léa Bernard",
    avatar: "",
    role: "Modérateur",
    joinDate: "Janvier 2025",
    isOnline: true,
    topics: 23,
    posts: 176,
  },
  {
    id: 107,
    name: "Camille Rousseau",
    avatar: "",
    role: "Membre",
    joinDate: "Avril 2025",
    isOnline: false,
    topics: 3,
    posts: 28,
  },
  {
    id: 108,
    name: "Chloé Lemoine",
    avatar: "",
    role: "Membre",
    joinDate: "Février 2025",
    isOnline: false,
    topics: 8,
    posts: 67,
  },
  {
    id: 109,
    name: "Inès Durand",
    avatar: "",
    role: "Membre",
    joinDate: "Mars 2025",
    isOnline: true,
    topics: 10,
    posts: 73,
  },
];

const Members = () => {
  return (
    <Layout>
      <MemberList members={sampleMembers} />
    </Layout>
  );
};

export default Members;
