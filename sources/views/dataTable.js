import {JetView} from "webix-jet";
import {showConfirmMessage} from "helpers/deleteItem";

export default class DataTableView extends JetView{
	constructor(app, data, title) {
		super(app);
		this.title = title;
		this.data = data;
	}
	config(){
		return {
			rows: [
				{
					padding: 5,
					cols: [
						{
							view: "button", 
							value: "Add new", 
							autowidth: true, 
							css: "webix_primary", 
							click: () => this.addItem(),
						},
						{}
					]
				},
				{
					view: "datatable",
					localId: "dataTable",
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
							showConfirmMessage(id, this.table);
						}
					},
				}
			]
		};
	}
	init() {
		this.$$("dataTable").parse(this.data);
		this.table = this.$$("dataTable");
	}
	addItem() {
		webix.prompt({
			title: `Add a new ${this.title}`,
			ok: "Add",
			cancel: "Canael",
			input: {
				required: true,
				placeholder: "This field is required",
			}
		}).then(
			(result) => {
				this.table.add({"Name": result});
			}
		);
	}
}