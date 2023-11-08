import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField  } from "@mui/material";
import { useState } from "react";
export default function AddCar(props) {

    const [car, setCar] = useState({brand: '', model: ''});
    const [showDialog, setShowDialog] = useState(false);

    const handleClose = (event, reason) => {
        if(reason != 'backdropClick'){
        setShowDialog(false);
    }
    }

	const handleSave = () => {
		props.addCar(car);
		setShowDialog(false);
	}

    const handleInputChange = (event) => {
		setCar({...car, [event.target.name]: event.target.value })
    }



    return (
        <>
            <Button onClick={() => setShowDialog(true)}>New Car</Button>
            <Dialog
            open={showDialog}
            onClose={handleClose}
            >
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField 
                    label="Brand"
					name="brand"
                    value={car.brand}
                    onChange={handleInputChange}
                    />
					 <TextField 
                    label="Model"
					name="model"
                    value={car.model}
                    onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
					<Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}