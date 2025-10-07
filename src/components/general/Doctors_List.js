import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import Doctor_card from "./Doctor_card";

const Doctors_List = () => {
  const [refreshing, setrefreshing] = useState(false);

  // Static doctors data with 20 entries
  const staticDoctors = [
    {
      _id: "1",
      name: "Dr. Sarah Johnson",
      info: {
        specialization: "Cardiologist",
        profilepic: "https://randomuser.me/api/portraits/women/1.jpg",
      },
    },
    {
      _id: "2",
      name: "Dr. Michael Chen",
      info: {
        specialization: "Neurologist",
        profilepic: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    },
    {
      _id: "3",
      name: "Dr. Emily Davis",
      info: {
        specialization: "Pediatrician",
        profilepic: "https://randomuser.me/api/portraits/women/3.jpg",
      },
    },
    {
      _id: "4",
      name: "Dr. James Wilson",
      info: {
        specialization: "Orthopedic Surgeon",
        profilepic: "https://randomuser.me/api/portraits/men/4.jpg",
      },
    },
    {
      _id: "5",
      name: "Dr. Lisa Rodriguez",
      info: {
        specialization: "Dermatologist",
        profilepic: "https://randomuser.me/api/portraits/women/5.jpg",
      },
    },
    {
      _id: "6",
      name: "Dr. David Thompson",
      info: {
        specialization: "Psychiatrist",
        profilepic: "https://randomuser.me/api/portraits/men/6.jpg",
      },
    },
    {
      _id: "7",
      name: "Dr. Maria Garcia",
      info: {
        specialization: "Gynecologist",
        profilepic: "https://randomuser.me/api/portraits/women/7.jpg",
      },
    },
    {
      _id: "8",
      name: "Dr. Robert Lee",
      info: {
        specialization: "Ophthalmologist",
        profilepic: "https://randomuser.me/api/portraits/men/8.jpg",
      },
    },
    {
      _id: "9",
      name: "Dr. Jennifer Brown",
      info: {
        specialization: "Endocrinologist",
        profilepic: "https://randomuser.me/api/portraits/women/9.jpg",
      },
    },
    {
      _id: "10",
      name: "Dr. Christopher Miller",
      info: {
        specialization: "Urologist",
        profilepic: "https://randomuser.me/api/portraits/men/10.jpg",
      },
    },
    {
      _id: "11",
      name: "Dr. Amanda Taylor",
      info: {
        specialization: "Rheumatologist",
        profilepic: "https://randomuser.me/api/portraits/women/11.jpg",
      },
    },
    {
      _id: "12",
      name: "Dr. Kevin Anderson",
      info: {
        specialization: "Gastroenterologist",
        profilepic: "https://randomuser.me/api/portraits/men/12.jpg",
      },
    },
    {
      _id: "13",
      name: "Dr. Rachel White",
      info: {
        specialization: "Pulmonologist",
        profilepic: "https://randomuser.me/api/portraits/women/13.jpg",
      },
    },
    {
      _id: "14",
      name: "Dr. Steven Clark",
      info: {
        specialization: "Anesthesiologist",
        profilepic: "https://randomuser.me/api/portraits/men/14.jpg",
      },
    },
    {
      _id: "15",
      name: "Dr. Nicole Martinez",
      info: {
        specialization: "Radiologist",
        profilepic: "https://randomuser.me/api/portraits/women/15.jpg",
      },
    },
    {
      _id: "16",
      name: "Dr. Daniel Lewis",
      info: {
        specialization: "Emergency Medicine",
        profilepic: "https://randomuser.me/api/portraits/men/16.jpg",
      },
    },
    {
      _id: "17",
      name: "Dr. Samantha Hall",
      info: {
        specialization: "Oncologist",
        profilepic: "https://randomuser.me/api/portraits/women/17.jpg",
      },
    },
    {
      _id: "18",
      name: "Dr. Mark Turner",
      info: {
        specialization: "Plastic Surgeon",
        profilepic: "https://randomuser.me/api/portraits/men/18.jpg",
      },
    },
    {
      _id: "19",
      name: "Dr. Laura Parker",
      info: {
        specialization: "Pathologist",
        profilepic: "https://randomuser.me/api/portraits/women/19.jpg",
      },
    },
    {
      _id: "20",
      name: "Dr. Andrew Young",
      info: {
        specialization: "Family Medicine",
        profilepic: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    },
  ];

  const onRefresh = () => {
    setrefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setrefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl
          size={"large"}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
      }
    >
      {staticDoctors.map((doc, index) => {
        return (
          <Doctor_card
            key={index}
            name={doc.name}
            specialization={doc?.info?.specialization}
            id={doc._id}
            image={doc?.info?.profilepic}
          />
        );
      })}
    </ScrollView>
  );
};

export default Doctors_List;
