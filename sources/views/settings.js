import { JetView } from "webix-jet";
export default class SettingsView extends JetView {
	config() {
		return {
			rows: [
				{
					view: "segmented",
					value: "en",
					inputWidth: 250,
					options: [
						{ id: "en", value: "EN" },
						{ id: "ru", value: "RU" }
					]
				},
				{}
			]
		};
	}
}