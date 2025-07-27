import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Select, MenuItem, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'white',
    boxShadow: 24, p: 4, borderRadius: 2,
};

const PLotStatusforAdmin = ({ open, onClose, plotNumberId, plotInfo }) => {
    const [status, setStatus] = useState(plotInfo.status);
    const [dealerName, setDealerName] = useState('');
    const [dealerContact, setDealerContact] = useState('');
    const [dealerModalOpen, setDealerModalOpen] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(()=> {
        setStatus(plotInfo.status)
    },[plotInfo])

    const handleStatusSave = async () => {
        try {
            if (status) {
                await axios.patch(`${BASE_URL}/api/town/plot/${plotNumberId}`, { status });
            }
            handleClose();
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleDealerSave = async () => {
        try {
            await axios.patch(`${BASE_URL}/api/town/plot/${plotNumberId}`, {
                dealerName,
                dealerContact,
            });
            setDealerModalOpen(false);
            setDealerName('');
            setDealerContact('');
        } catch (err) {
            console.error('Failed to save dealer:', err);
        }
    };

    const handleClose = () => {
        setStatus('');
        onClose();
    };

    const handleDealerClose = () => {
        setDealerName('');
        setDealerContact('');
        setDealerModalOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Update Plot Status</Typography>
                    <InputLabel id="status-label">Select Status</InputLabel>
                    <Select
                        fullWidth
                        labelId="status-label"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="sell">Sell</MenuItem>
                    </Select>

                    <Box display="flex" mb={3} gap={1}>
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleStatusSave}
                        >
                            Save
                        </Button>
                    </Box>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setDealerModalOpen(true)}
                    >
                        Assign Dealer
                    </Button>
                </Box>
            </Modal>

            {/* Second Modal: Dealer Info */}
            <Modal open={dealerModalOpen} onClose={handleDealerClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Assign Dealer / Investor</Typography>

                    <TextField
                        fullWidth
                        label="Dealer Name"
                        value={dealerName}
                        onChange={(e) => setDealerName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Dealer Contact"
                        value={dealerContact}
                        onChange={(e) => setDealerContact(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleDealerClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleDealerSave}
                            disabled={!dealerName || !dealerContact}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default PLotStatusforAdmin;
