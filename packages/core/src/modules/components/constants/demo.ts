import { EditorComponentDefinition } from "../types";



export const DemoComponent: EditorComponentDefinition = {
	id: 'room-card',
	label: 'Room Card',
	rootTagName: 'div',
	properties: {
		name: {
			type: 'text',
			label: 'Name',
			default: '1000 parfun',	
			placeholder: 'Enter name',
		},
		fee: {
			type: 'text',
			label: 'Fee',
			default: '300.00$',
			placeholder: 'Enter fee',
		},
	},
	content: `
		<div class="room-card">
			<div class="room-card__image">
				<img src="https://placehold.co/600x400" alt="Room Card">
			</div>
			<div class="room-card__content">
				<h3 class="room-card__name">{{name}}</h3>
				<p class="room-card__fee">{{fee}}</p>
			</div>
		</div>
	`,
}