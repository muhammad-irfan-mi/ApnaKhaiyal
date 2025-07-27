import { Modal, Box, Button, Typography } from '@mui/material';

const modalStyle = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400, bgcolor: 'white',
    boxShadow: 24, p: 4, borderRadius: 2,
};

const PLotStatusforUser = ({ open, onClose, plotInfo }) => {

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>

                    <Typography variant="body1" sx={{ mb: 2 }} fontWeight='bold'>Dealer Info</Typography>
                    <Box bgcolor={'#f3f4f6'} p={1} borderRadius={2} boxShadow={2}>
                        <Typography variant="body">{plotInfo.dealerName || 'No Dealer Added yet'}</Typography><br />
                        <Typography variant="body">{plotInfo.dealerContact}</Typography>
                    </Box>

                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        fullWidth
                    >
                        Plot Location
                    </Button>
                    <Button
                        sx={{ mt: 2 }}
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>

        </>
    );
};

export default PLotStatusforUser;
