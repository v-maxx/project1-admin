'use client'
import React, {useEffect, useState} from 'react';
import {Switch} from "@mui/material";
import {updateLink} from "@/app/lib/actions";
const TaskActiveToggleSwitch = ({id,active}) => {

    const [isActive, setIsActive] = useState(false)
    const handleChange= async (e,checked)=>{

        console.log('evnet--',e,checked)

       await updateLink({isActive:event.target.checked,id:id})
    }
    useEffect(() => {

        setIsActive(active)
    }, [active]);


    return (
        <div>

            <Switch defaultChecked size="large" onChange={async (event, checked)=>handleChange(event,checked)} checked={isActive} />


        </div>
    );
};

export default TaskActiveToggleSwitch;
