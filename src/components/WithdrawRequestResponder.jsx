'use client'
import React, {useEffect, useState} from 'react';
import {Switch} from "@mui/material";
import {updateLink, updateWithdrawRequest} from "@/app/lib/actions";
const WithdrawRequestResponder = ({id}) => {

    const handleAction = async (action) => {
        try {
            await updateWithdrawRequest(action, id);
        } catch (err) {
            console.error(err);
        }
    };

    //
    // useEffect(() => {
    //
    //     setIsActive(active)
    // }, [active]);


    return (
        <div className={'flex gap-2'}>
            <button onClick={() => handleAction('reject')} className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-white bg-red-600 focus:outline-none">
                Reject
            </button>
            <button onClick={() => handleAction('approve')} className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Approve
            </button>
        </div>
    );
};

export default WithdrawRequestResponder;
