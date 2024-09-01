import React from 'react';
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import Image from "next/image";

const UserApplication = ({data}) => {
    const { _id:id, name, fatherName, documentType, documentNumber, mobile, verification,
        address, address1, residenceType, occupation, category, email, frontPhoto,
        backPhoto, photo, status, initiatedBy, createdAt, updatedAt}=data
    const formatDate = (dateString) => new Date(dateString).toLocaleString();

    const renderField = (label, value) => (
        <Box mb={2} className={'border p-4 rounded-2xl shadow-sm'}>
            <Typography variant="subtitle1" color="textSecondary">{label}</Typography>
            <Typography variant="body1" fontWeight={700}>{value}</Typography>
        </Box>
    );

    const renderImage = (label, src) => (
        <Box mb={2}>
            <Typography variant="subtitle1" color="textSecondary">{label}</Typography>

            {src ? <CardMedia component="img" src={src} alt={label} style={{borderRadius: '8px'}}/> :'NA'}
        </Box>
    );

    return (
        <Card className="w-full flex justify-center flex-col mx-auto ">
            <CardHeader title="User Application" titleTypographyProps={{ variant: 'h4', align: 'center' }} />
            <CardContent>
                <Box display="flex" justifyContent="center" mb={3}>
                    <Image width={300} height={300} src={photo} alt={name} sx={{ width: 100, height: 100 }} />
                </Box>
                <Box display="grid" gridTemplateColumns="50% 1fr" gap={3} mb={3}>
                    {renderField("ID", id)}
                    {renderField("Name", name)}
                    {renderField("Father's Name", fatherName)}
                    {renderField("Document Type", documentType)}
                    {renderField("Document Number", documentNumber)}
                    {renderField("Mobile", mobile)}
                    {renderField("Verification", verification ? 'Verified' :'Not verified')}
                    {renderField("Address", address)}
                    {renderField("Address 1", address1 ? address1 :'NA')}
                    {renderField("Residence Type", residenceType)}
                    {renderField("Occupation", occupation)}
                    {renderField("Category", category)}
                    {renderField("Email", email)}
                    {renderField("Status", status)}
                    {renderField("Initiated By", initiatedBy.email)}
                    {renderField("Created At", formatDate(createdAt))}
                    {renderField("Updated At", formatDate(updatedAt))}
                </Box>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                    {renderImage("Front Photo", frontPhoto)}
                    {renderImage("Back Photo", backPhoto)}
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserApplication;
