// Hospital_List.js
import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import Hospital_card from "./Hospital_card";

const Hospital_List = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Static hospitals data with 20 entries
  const staticHospitals = [
    {
      _id: "1",
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      specialization: "Multi-Specialty",
      image:
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "24/7",
    },
    {
      _id: "2",
      name: "St. Mary's Medical Center",
      address: "456 Oak Avenue, Midtown",
      specialization: "Cardiology & Surgery",
      image:
        "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "06:00 - 22:00",
    },
    {
      _id: "3",
      name: "Children's Care Hospital",
      address: "789 Elm Street, Northside",
      specialization: "Pediatrics",
      image:
        "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 20:00",
    },
    {
      _id: "4",
      name: "Metro Heart Institute",
      address: "321 Pine Road, Central City",
      specialization: "Cardiology",
      image:
        "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "07:00 - 19:00",
    },
    {
      _id: "5",
      name: "Sunrise Orthopedic Center",
      address: "654 Maple Drive, Eastside",
      specialization: "Orthopedics",
      image:
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 18:00",
    },
    {
      _id: "6",
      name: "Valley Women's Hospital",
      address: "987 Cedar Lane, Westside",
      specialization: "Obstetrics & Gynecology",
      image:
        "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "24/7",
    },
    {
      _id: "7",
      name: "Neuro Excellence Hospital",
      address: "147 Birch Street, South District",
      specialization: "Neurology & Neurosurgery",
      image:
        "https://images.pexels.com/photos/3845516/pexels-photo-3845516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "24/7",
    },
    {
      _id: "8",
      name: "Greenview Eye Hospital",
      address: "258 Willow Way, North Hills",
      specialization: "Ophthalmology",
      image:
        "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "09:00 - 17:00",
    },
    {
      _id: "9",
      name: "Cancer Care Institute",
      address: "369 Spruce Avenue, Medical District",
      specialization: "Oncology",
      image:
        "https://images.pexels.com/photos/1692617/pexels-photo-1692617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 20:00",
    },
    {
      _id: "10",
      name: "Riverside Emergency Center",
      address: "741 River Road, Riverside",
      specialization: "Emergency Medicine",
      image:
        "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "24/7",
    },
    {
      _id: "11",
      name: "Skin & Beauty Clinic",
      address: "852 Fashion Boulevard, Uptown",
      specialization: "Dermatology",
      image:
        "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "10:00 - 18:00",
    },
    {
      _id: "12",
      name: "Mental Wellness Center",
      address: "963 Harmony Street, Peaceful Valley",
      specialization: "Psychiatry & Psychology",
      image:
        "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "09:00 - 17:00",
    },
    {
      _id: "13",
      name: "Digestive Health Hospital",
      address: "174 Wellness Drive, Health District",
      specialization: "Gastroenterology",
      image:
        "https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 16:00",
    },
    {
      _id: "14",
      name: "Breath Easy Lung Center",
      address: "285 Fresh Air Lane, Hill View",
      specialization: "Pulmonology",
      image:
        "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "07:00 - 19:00",
    },
    {
      _id: "15",
      name: "Joint & Bone Hospital",
      address: "396 Strong Street, Athletic District",
      specialization: "Rheumatology",
      image:
        "https://images.pexels.com/photos/3845516/pexels-photo-3845516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 18:00",
    },
    {
      _id: "16",
      name: "Kidney Care Center",
      address: "507 Health Plaza, Medical Mile",
      specialization: "Nephrology",
      image:
        "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "06:00 - 22:00",
    },
    {
      _id: "17",
      name: "Hormone Balance Clinic",
      address: "618 Vitality Road, Wellness Center",
      specialization: "Endocrinology",
      image:
        "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "09:00 - 17:00",
    },
    {
      _id: "18",
      name: "Family Care Medical Center",
      address: "729 Community Drive, Suburb",
      specialization: "Family Medicine",
      image:
        "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "08:00 - 20:00",
    },
    {
      _id: "19",
      name: "Advanced Surgery Hospital",
      address: "830 Precision Street, Tech District",
      specialization: "General Surgery",
      image:
        "https://images.pexels.com/photos/1692617/pexels-photo-1692617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "24/7",
    },
    {
      _id: "20",
      name: "Rehabilitation & Recovery Center",
      address: "941 Recovery Lane, Healing Heights",
      specialization: "Rehabilitation Medicine",
      image:
        "https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      timing: "07:00 - 21:00",
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
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
      {staticHospitals.map((hospital, index) => {
        return (
          <Hospital_card
            key={index}
            name={hospital.name}
            address={hospital.address}
            specialization={hospital.specialization}
            id={hospital._id}
            image={hospital.image}
            timing={hospital.timing}
          />
        );
      })}
    </ScrollView>
  );
};

export default Hospital_List;
