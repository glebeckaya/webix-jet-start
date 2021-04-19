import {JetView} from "webix-jet";
import {showConfirmMessage} from "helpers/deleteItem";

export default class DataTableView extends JetView{
	constructor(app, data, title) {
		super(app);
		this.title = title;
		this.data = data;
	}
	config(){
		const _ = this.app.getService("locale")._;

		return {
			rows: [
				{
					padding: 5,
					cols: [
						{
							view: "button", 
							value: _("Add new"), 
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
						{ id: "Name", header: _("Name"), sort:"string", fillspace: true, editor: "text" },
						{ id: "del", header: _("Del"), template: "{common.trashIcon()}", width: 100 },
					],
					css: "webix_shadow_medium",
					rules: {
						Name: webix.rules.isNotEmpty,
					},
					onClick: {
						"wxi-trash": (e, id) => {
							showConfirmMessage(id, this.table, _);
						}
					},
				}
			]
		};
	}
	init() {
		this.$$("dataTable").parse(this.data);
		this.table = this.$$("dataTable");
		this._ = this.app.getService("locale")._;
	}
	addItem() {
		webix.prompt({
			title: this._(`AddNew${this.title}`),
			ok: this._("Add new"),
			cancel: this._("Cancel"),
			input: {
				required: true,
				placeholder: this._("fieldRequired"),
			}
		}).then(
			(result) => {
				this.table.add({"Name": result});
			}
		);
	}
}