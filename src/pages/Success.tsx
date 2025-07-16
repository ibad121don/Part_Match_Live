import { supabase } from "@/integrations/supabase/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    saveToDB();
    // eslint-disable-next-line
  }, []);

  const saveToDB = async () => {
    let userdata = await localStorage.getItem("profiles");
    let tempuser = JSON.parse(userdata);
    console.log(tempuser);
    if (userdata != null) {
      await localStorage.setItem(
        "profiles",
        JSON.stringify({
          ...tempuser,
          isSubscribed: true,
          subscriptionStatus: "active",
        })
      );
      await supabase
        .from("profiles")
        .update({
          subscription_type: "active",
        })
        .eq("id", tempuser.id);
      setSaved(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-green-700">
          Payment Successful
        </h1>
        <p className="text-base sm:text-lg mb-6 text-gray-700 text-center">
          Thank you! Your subscription has been activated.
        </p>
        <button
          onClick={() => navigate("/seller-dashboard")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
