import React from "react";
import ansari from "@/assets/team/ansari.jpg";
import babli from "@/assets/team/babli_main.jpg";
import port from "@/assets/team/port.jpg";
import styles from "./TeamSection.module.css";

const teamMembers = [
  { name: "Aslam  Ansari", photo: ansari, role: "Frontend Developer" },
  { name: "Babli kumari", photo: babli, role: "Frontend Developer" },
  { name: "Nitin Raj", photo:port, role: "Full stack Devloper" },

];

const TeamSection = () => {
  return (
    <section className={styles.teamSection}>
      <h2 className={styles.title}>Meet Our Team</h2>
      <div className={styles.grid}>
        {teamMembers.map((member) => (
          <div key={member.name} className={styles.memberCard}>
            <img
              src={member.photo}
              alt={member.name}
              className={styles.photo}
            />
            <h3 className={styles.name}>{member.name}</h3>
            {member.role && <p className={styles.role}>{member.role}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
