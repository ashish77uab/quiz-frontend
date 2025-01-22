import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TopBar from "../components/layout/TopBar";


const PaymentStatus = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isSuccess = searchParams.get("isSuccess") === 'true'






  return (
    <>

      <section className="flex-1 px-4 py-6">
        <div className="min-h-[200px]">
          {isSuccess ? "Payment Success" : "Payment Failed"}
        </div>


      </section>
    </>
  );
};

export default PaymentStatus;
