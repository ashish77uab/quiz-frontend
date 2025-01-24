import React from 'react'
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer'
const Pay = ({ amount, quizId, userId }) => {
    const makePayment = async (e) => {

        e.preventDefault();

        const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

        const payload = {
            merchantId: process.env.REACT_APP_MERCHANT_ID,
            merchantTransactionId: transactionid,
            merchantUserId: 'MUID-' + uuidv4().toString(36).slice(-6),
            amount: amount * 100,
            redirectUrl: `http://localhost:5000/auth/phonepe/status?quizId=${quizId}&userId=${userId}`,
            redirectMode: "POST",
            callbackUrl: `http://localhost:5000/auth/phonepe/status?quizId=${quizId}&userId=${userId}`,
            mobileNumber: '9874563210',
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };


        const dataPayload = JSON.stringify(payload);
        console.log(dataPayload);

        const dataBase64 = Buffer.from(dataPayload).toString("base64");
        console.log(dataBase64);


        const fullURL =
            dataBase64 + "/pg/v1/pay" + process.env.REACT_APP_SALT_KEY;
        const dataSha256 = sha256(fullURL);

        const checksum = dataSha256 + "###" + process.env.REACT_APP_SALT_INDEX;
        console.log("c====", checksum);



        const UAT_PAY_API_URL =
            "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";


        const response = await axios.post(
            UAT_PAY_API_URL,
            {
                request: dataBase64,
            },
            {
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
            }
        );


        const redirect = response.data.data.instrumentResponse.redirectInfo.url;
        window.location.href = redirect;


    }


    return (
        <div className='w-full'>
            <button
                onClick={(e) => makePayment(e)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Pay &nbsp; Rs.{amount}
            </button>
        </div>
    )
}

export default Pay