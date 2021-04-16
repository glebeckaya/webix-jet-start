import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";

export default class DataView extends JetView{
	config(){
		const countriesTab = {
			header: "Countries",
			body: {
				view: "datatable",
				data: countries,
				autoConfig: true,
				css: "webix_shadow_medium"
			}
		};
		const statusTab = {
			header: "Ststus",
			body: {
				view: "datatable",
				data: statuses,
				columns: [
					{ id: "Name", header: "Name", sort:"string", fillspace: true }
				],
				autoConfig: true,
				css: "webix_shadow_medium"
			}
		};
		return { view: "tabview", cells: [countriesTab, statusTab] };
	}
}