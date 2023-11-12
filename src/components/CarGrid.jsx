import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Cargrid(props) {

	const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);

	const columnProperties = {
		filter: true,
		floatingFilter: true,
		sortable: true,
	};

	const deleteCar = (params) => {
		if (window.confirm("Are you sure?")) {
			fetch(params.data._links.car.href, { method: 'DELETE' })
				.then(res => {
					if (res.ok) {
						props.getCars();
						setMsg("Car has been deleted successfully!");
						setOpen(true);
					} else {
						alert("Something went wrong deleting a car!" + res.status)
					}
				})
				.catch(err => console.log(err));
		}
	}

	const addCar = (car) => {
		fetch(props.restURL, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(car)
		})
			.then(res => {
				if (res.ok) {
					props.getCars();
				} else {
					alert("Something went wrong adding a car!" + res.status)
				}
			})
			.catch(err => console.error(err));
	}

	const updateCar = (car, link) => {
		if(window.confirm("Are you sure?")){
		fetch(link, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify(car)
		})
			.then(res => {
				if (res.ok) {
					props.getCars();
					setMsg("Car has been edited successfully!");
					setOpen(true);
				} else {
					alert("Something went wrong updating a car!" + res.status)
				}
			})
			.catch(err => console.error(err))
		}
	}

	const columns = [
		{ headerName: 'Brand', field: 'brand', ...columnProperties },
		{ headerName: 'Model', field: 'model', ...columnProperties },
		{ headerName: 'Color', field: 'color', ...columnProperties },
		{ headerName: 'Fuel', field: 'fuel', ...columnProperties },
		{ headerName: 'Year', field: 'year', ...columnProperties },
		{ headerName: 'Price', field: 'price', ...columnProperties },
		{
			cellRenderer: row => <EditCar updateCar={updateCar} car={row.data} />
		},
		{
			cellRenderer: params =>
				<Button size="small" color="error" onClick={() => deleteCar(params)}>
					Delete
				</Button>
		}


	];

	return (
		<>
			<AddCar
				addCar={addCar}
			/>
			<div className="ag-theme-material" style={{ height: 650, width: 1600, margin: "auto" }}>
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