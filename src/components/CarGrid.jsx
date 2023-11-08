import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";

export default function Cargrid(props) {

	const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);

	const columnProperties = {
		filter: true,
		floatingFilter: true,
		sortable: true,
	};

	const deleteCar = (params) => {
		console.log("params.data._links.car.href = " + params.data._links.car.href);
		if (window.confirm("Are you sure?")) {
			fetch(params.data._links.car.href, { method: 'DELETE' })
				.then(res => {
					if (res.ok) {
						props.getCars();
						setMsg("Car is deleted");
						setOpen(true);
					} else {
						alert("Something went wrong!" + res.status)
					}
				})
				.catch(err => console.log(err));
		}
	}

	const addCar = (car) => {
		fetch(props.restURL, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify(car)
		})
		.then(res => {
			if(res.ok) {
				props.getCars();
			} else {
				alert("Something went wrong!")
			}
		})
		.catch(err => console.error(err));
	}

	const columns = [
		{ headerName: 'Brand', field: 'brand', ...columnProperties },
		{ headerName: 'Model', field: 'model', ...columnProperties },
		{ headerName: 'Color', field: 'color', ...columnProperties },
		{ headerName: 'Fuel', field: 'fuel', ...columnProperties },
		{ headerName: 'Year', field: 'year', ...columnProperties },
		{ headerName: 'Price', field: 'price', ...columnProperties },
		{
			cellRenderer: params =>
				<Button size="small" color="error" onClick={() => deleteCar(params)}>
					Delete
				</Button>,
			width: 120
		}

	];

	return (
<>
<AddCar 
addCar={addCar}
/>
		<div className="ag-theme-material" style={{ height: 650, width: 1400, margin: "auto" }}>
			<AgGridReact
				rowData={props.cars}
				columnDefs={columns}
				pagination={true}
				paginationPageSize={10}
			>
			</AgGridReact>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message={msg}
			/>

		</div>
		</>
	);




}