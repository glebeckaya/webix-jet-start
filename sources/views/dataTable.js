import {JetView} from "webix-jet";

export default class DataTableView extends JetView{
	constructor(app, title, data) {
		super(app);
		this.data = data;
		this.title = title;
	}
	config(){
		return {
			header: () => this.title,
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
								this.showConfirmMessage(id);
							}
						},
					}
				]
				
			}
		};
	}
	init() {
		this.$$("dataTable").parse(this.data);
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
				this.data.add({"Name": result});
			}
		);
	}
	showConfirmMessage(id) {
		if (!this.data.getItem(id)) return;
		webix.confirm({
			text: `Do you really want to delete "${this.data.getItem(id)["Name"]}"?`
		}).then(
			() => this.data.remove(id)
		);
	}
}