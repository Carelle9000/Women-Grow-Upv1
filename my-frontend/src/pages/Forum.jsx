import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import HeroSection from "../Components/SectionForum/Herosection";
import ForumSection from "../Components/SectionForum/ForumSection";
import CallToActionSection from "../Components/SectionForum/CallToActionSection";
import RecentDiscussions from "../Components/SectionForum/RecentDiscussions";
import Footer from "../Components/Footer";
// Import ScrollToTop component
import ScrollToTop from "@/Components/ScrollToTop";

const fakeMembers = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Sophie" },
  { id: 3, name: "Chloé" },
];

function Forum() {
  const [members, setMembers] = useState(fakeMembers);
  const [messages, setMessages] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [privateText, setPrivateText] = useState("");

  const addMember = (name) => {
    const newMember = { id: Date.now(), name };
    setMembers([...members, newMember]);
  };

  const removeMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const sendMessage = () => {
    if (messageText.trim()) {
      setMessages([...messages, { id: Date.now(), text: messageText }]);
      setMessageText("");
    }
  };

  const sendPrivateMessage = () => {
    if (privateText.trim() && selectedUser) {
      setPrivateMessages([...privateMessages, { id: Date.now(), to: selectedUser.name, text: privateText }]);
      setPrivateText("");
    }
  };

  return (
    <div className="bg-roseClair bg-indigo-50">
      {/* Header */}
      <Header className="z-20"/>
      
      {/*section Hero*/}
      <HeroSection className="z-10"/>
      
      {/*ForumSection*/}
      <ForumSection />

       {/*Recent Discussion*/}
       <RecentDiscussions />
      
      {/*Call to Action*/}
      <CallToActionSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Add the ScrollToTop component */}
      <ScrollToTop />
    </div>
  );
}

export default Forum;