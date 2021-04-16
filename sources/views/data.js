import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";

export default class DataView extends JetView{
	config(){
		const countriesTab = {
			header: "Countries",
			body: {
				rows: [
					{
						padding: 5,
						cols: [
							{
								view: "button", 
								value: "Add new", 
								autowidth: true, 
								css: "webix_primary", 
								click: () => this.addCountry(),
							},
							{}
						]
						
					},
					{
						view: "datatable",
						data: countries,
						editable: true,
						columns: [
							{ id: "Name", header: "Name", sort:"string", fillspace: true, editor: "text" },
							{ id: "del", header: "Del", template: "{common.trashIcon()}", width: 50 },
						],
						css: "webix_shadow_medium",
						rules: {
							Name: webix.rules.isNotEmpty,
						},
						onClick: {
							"wxi-trash": (e, id) => {
								this.showConfirmMessage(id, countries);
							}
						},
					}
				]
				
			}
		};
		const statusTab = {
			header: "Ststus",
			body: {
				rows: [
					{
						padding: 5,
						cols: [
							{
								view: "button", 
								value: "Add new", 
								autowidth: true, 
								css: "webix_primary", 
								click: () => this.addStatus(),
							},
							{}
						]
						
					},
					{
						view: "datatable",
						data: statuses,
						localId: "sattusesTable",
						columns: [
							{ id: "Name", header: "Name", sort:"string", fillspace: true, editor: "text" },
							{ id: "del", header: "Del", template: "{common.trashIcon()}", width: 50 },
						],
						editable: true,
						css: "webix_shadow_medium",
						rules: {
							Name: webix.rules.isNotEmpty,
						},
						onClick: {
							"wxi-trash": (e, id) => {
								this.showConfirmMessage(id, statuses);
							}
						},
					}
				]
				
			}
		};
		return { view: "tabview", cells: [countriesTab, statusTab] };
	}
	addCountry() {
		webix.prompt({
			title: "Add a new country",
			ok: "Add",
			cancel: "Canael",
			input: {
				required: true,
				placeholder: "This field is required",
			}
		}).then(
			(result) => {
				countries.add(Object({"Name": result}));
			}
		);
	}
	addStatus() {
		webix.prompt({
			title: "Add a new status",
			ok: "Add",
			cancel: "Canael",
			input: {
				required: true,
				placeholder: "This field is required",
			}
		}).then(
			(result) => {
				const status = {};
				status["Name"] = result;
				const statusAmount = Object.keys(statuses.data.pull).length;
				let idRandomStatus = (Math.floor(1 + Math.random() * (statusAmount - 1)));
				status["icon"] = statuses.getItem(idRandomStatus)["Icon"];
				statuses.add(status);
			}
		);
	}
	showConfirmMessage(id, data) {
		if (!data) return;
		webix.confirm({
			text: `Do you really want to delete "${data.getItem(id)["Name"]}"?`
		}).then(
			() => data.remove(id)
		);
	}
}