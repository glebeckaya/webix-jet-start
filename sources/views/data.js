import {JetView} from "webix-jet";
import {countries} from "models/countries";
import {statuses} from "models/statuses";
import DataTableView from "views/dataTable";

export default class DataView extends JetView{
	config() {
		const countriesTable = {
			cols: [new DataTableView(this.app, countries, "country")],
			localId: "countriesTable"
		};

		const statusesTable = {
			cols: [new DataTableView(this.app, statuses, "status")],
			localId: "statusesTable"
		};

		return {
			rows: [
				{
					view: "tabbar", 
					localId: "tabbar",
					options: [
						{value: "Countries", id: "countriesTable"},
						{value: "Statuses", id: "statusesTable"}
					]
				},
				{
					view: "multiview", 
					cells: [countriesTable, statusesTable]
				}
			]
		};
	}

	init() {
		this.$$("tabbar").attachEvent("onChange", (tab) => {
			this.$$(tab).show();
		});
	}
}