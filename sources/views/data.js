import {JetView} from "webix-jet";
import DataTableView from "views/dataTable.js";
import {countries} from "models/countries";
import {statuses} from "models/statuses";


export default class DataView extends JetView{
	config(){
		const countriesTab = new DataTableView(this.app, "Countries", countries);
		const statusTab = new DataTableView(this.app, "Statuses", statuses);

		return { view: "tabview", cells: [countriesTab, statusTab] };
	}
}