import {JetView} from "webix-jet";
import ContactsFormView from "views/contactsForm";

export default class PopupView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;

		return { 
			view: "window",
			position: "center",
			move: true,
			head: {
				cols: [
					{ template: _("AddNewContact"), type: "header", borderless: true },
					{ view: "icon", icon: "wxi-close", tooltip: "Close window", click: () => {
						this.hideWindow();
					}}
				]
				
			},
			body: ContactsFormView
		};
	}
	init(){
		this.on(this.app, "onDataEditStop", ()=>{
			this.getRoot().getBody().clear();
			this.getRoot().hide();
		});
	}
	showWindow() {
		this.getRoot().show();
	}
	hideWindow() {
		this.getRoot().hide();
	}
}