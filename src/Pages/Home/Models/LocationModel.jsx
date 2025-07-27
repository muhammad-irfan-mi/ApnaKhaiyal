import React, { useState } from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    IconButton
} from '@mui/material';

const punjabDistricts = [
    "Lahore", "Multan", "Faisalabad", "Bahawalpur", "Rawalpindi", "Gujranwala", "Sialkot", "DG Khan"
];

const sindhDistricts = [
    "Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpurkhas", "Shikarpur"
];

export default function LocationModal({ isOpen, onClose, onSelect }) {
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleDistrictClick = (district) => {
        onSelect(district);
        onClose();
        setSelectedProvince(null);
        
    };

    const handleClose = () => {
        setSelectedProvince(null);
        onClose();
    };

    const handleBack = () => {
        setSelectedProvince(null);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm">
            <DialogTitle className='w-[400px] relative'>
                {!selectedProvince && <h1 className='font-[900] '>Location</h1>}
                <button
                    className='text-[10px] absolute top-0 right-0 bg-slate-100 rounded-full'
                    onClick={handleClose}>
                    <CloseIcon fontSize="small"/>
                </button>
                {selectedProvince && (
                    <div className="flex justify-between items-center ">
                        <Typography variant="caption" sx={{fontSize:"19px", fontWeight:900}}>
                            Location&gt;{selectedProvince}
                        </Typography>
                        <IconButton  sx={{fontSize: "6px", "&:hover": { backgroundColor: "transparent" }, fontWeight: "bold", color: "black" }} onClick={handleBack}>
                            <ArrowBackIcon fontSize="medium" /> <span className='text-[15px]'>Go Back</span>
                        </IconButton>
                    </div>
                )}
            </DialogTitle>
            <DialogContent className='w-[400px] h-[260px]'>
                {!selectedProvince && (
                    <div className='flex flex-col justify-start'>
                        <button className='p-1.5 border-t border-slate-300 flex justify-between text-[10px]'
                            onClick={() => setSelectedProvince('Punjab')}>
                            Punjab <KeyboardArrowRightIcon fontSize="small" />
                        </button>
                        <button className='border-t border-slate-300 p-1.5 flex justify-between text-[10px]'
                            onClick={() => setSelectedProvince('Sindh')}>
                            Sindh <KeyboardArrowRightIcon fontSize="small" />
                        </button>
                    </div>
                )}
                {selectedProvince && (
                    <List>
                        {(selectedProvince === 'Punjab' ? punjabDistricts : sindhDistricts).map((district) => (
                            <ListItem key={district} disablePadding>
                                <ListItemButton
                                    sx={{
                                        paddingTop: 1.2,
                                        borderBottom: "1px solid lightGray",
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            '& .MuiTypography-root': {
                                                color: '#002456',
                                            },
                                        },
                                    }}
                                    onClick={() => handleDistrictClick(district)}
                                >
                                    <ListItemText
                                        primary={district}
                                        primaryTypographyProps={{ fontSize: '8px' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
}
