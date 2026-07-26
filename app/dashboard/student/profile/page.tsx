"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStudentProfile } from "@/lib/auth"; 

interface StudentProfile {
  id: number;
  email: string;
  full_name: string;
  tvetstudent_id: string;
  course_area: string;
  level: string;
  school_name: string;
}

export default function StudentProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStudentProfile()
      .then((data: StudentProfile) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "NO_TOKEN" || err.message === "SESSION_EXPIRED") {
          router.push("/login");
        } else {
          setError("Failed to load profile details. Please try again.");
          setLoading(false);
        }
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600 font-medium animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-8 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 my-8 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="pb-4 border-b border-gray-200 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
        <p className="text-sm text-gray-500">Your personal and academic details</p>
      </div>

      {/* READ-ONLY PROFILE DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Full Name
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.full_name}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Email Address
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.email}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            TVET Student ID
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.tvetstudent_id}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Course Area
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.course_area}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Level
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.level}</span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
            School Name
          </span>
          <span className="text-gray-800 font-medium text-lg">{profile?.school_name}</span>
        </div>
      </div>
    </div>
  );
}
